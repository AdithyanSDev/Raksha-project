// src/services/AlertService.ts

import axios from 'axios';
import nodemailer from 'nodemailer';
import { Twilio } from 'twilio';
import { getDistance } from 'geolib';
import { AlertRepository } from '../repositories/AlertRepository';
import { IAlert } from '../models/Alert';
import { User } from '../models/User';

const EONET_API_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events';
const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export class AlertService {
  
  private alertRepository: AlertRepository;

  constructor() {
    this.alertRepository = new AlertRepository();
  }

  private transporter = nodemailer.createTransport({
    service: 'gmail', // Example, use your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  private async sendEmailNotification(to: string, alert: IAlert) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `Alert Notification: ${alert.title}`,
      text: `An alert has been issued in your area:\n\nTitle: ${alert.title}\nDescription: ${alert.description}\nLocation: ${alert.location.latitude}, ${alert.location.longitude}\nSeverity: ${alert.severity}`,
    };
    await this.transporter.sendMail(mailOptions);
  }


  private async sendSMSNotification(to: string, alert: IAlert) {
    // Ensure the number starts with the country code for India, +91
    const formattedNumber = to.startsWith('+91') ? to : `+91${to}`;
    
    try {
      await twilioClient.messages.create({
        body: `Alert: ${alert.title}. ${alert.description}. Severity: ${alert.severity}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedNumber,
      });
    } catch (error) {
      console.error(`Error sending SMS to ${formattedNumber}:`, error);
    }
  }
  

  // Fetch alerts from NASA EONET API and store in DB
  public async fetchEONETAlerts(): Promise<void> {
    try {
      const response = await axios.get(EONET_API_URL);
      const events = response.data.events; // Adapt based on EONET response structure

      for (const event of events) {
        const alertData: Partial<IAlert> = {
          title: event.title,
          description: event.description || "No description available",
          location: {
            latitude: event.geometries[0].coordinates[1],
            longitude: event.geometries[0].coordinates[0],
          },
          alertType: event.categories[0].title,
          severity: event.severity || 'Moderate',
          source: 'NASA EONET',
        };

        const existingAlert = await this.alertRepository.findAlertByTitle(event.title);
        if (!existingAlert) {
          const newAlert = await this.alertRepository.createAlert(alertData);
          await this.notifyNearbyUsers(newAlert);
        }
      }
    } catch (error) {
      console.error("Error fetching EONET alerts:", error);
    }
  }

  //Method to create custom alert
  async createCustomAlert(title: string, description: string, placeName: string, alertType: string, severity: string): Promise<IAlert> {
    const location = await this.getCoordinates(placeName);
    if (!location) throw new Error('Invalid location');

    const alertData: Partial<IAlert> = {
      title,
      description,
      location,
      alertType,
      severity,
      source: 'custom',
    };

    const newAlert = await this.alertRepository.createAlert(alertData);
    await this.notifyNearbyUsers(newAlert);
    return newAlert;
  }

  private async getCoordinates(placeName: string): Promise<{ latitude: number, longitude: number } | null> {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: { q: placeName, key: process.env.OPENCAGE_API_KEY },
      });
      const data = response.data;
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry;
        return { latitude: location.lat, longitude: location.lng };
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

// Notify users within a specified radius of the alert location
private async notifyNearbyUsers(alert: IAlert) {
  const radiusInKm = 50;
  const users = await User.find();

  const nearbyUsers = users.filter(user => {
    const distance = getDistance(
      { latitude: user.location.latitude, longitude: user.location.longitude },
      { latitude: alert.location.latitude, longitude: alert.location.longitude }
    );
    return distance / 1000 <= radiusInKm;
  });

  for (const user of nearbyUsers) {
    console.log(`Sending alert to ${user.username}`);
    try {
      // Send email notification
      await this.sendEmailNotification(user.email, alert);
      
      // Send SMS notification
      if (user.phoneNumber) {
        await this.sendSMSNotification(user.phoneNumber, alert);
      }
    } catch (error) {
      console.error(`Error sending notification to ${user.username}:`, error);
    }
  }
}

  
  
  public async getCustomAlerts(): Promise<IAlert[]> {
    return await this.alertRepository.getAllAlerts();
  }
}
