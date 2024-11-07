import { Request, Response } from "express";
import { AlertService } from "../services/AlertService";

export class AdminAlertController {
  private alertService: AlertService;

  constructor() {
    this.alertService = new AlertService();
  }

    // Admin endpoint to create a custom alert    
    createCustomAlert = async (req: Request, res: Response): Promise<Response> => {
      const { title, description, placeName, alertType, severity } = req.body;

      try {
        
        const newAlert = await this.alertService.createCustomAlert(title, description, placeName, alertType, severity);

        return res.status(201).json({ success: true, alert: newAlert });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating alert", error });
      }
    };

   // Fetch custom alerts
   getCustomAlerts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const alerts = await this.alertService.getCustomAlerts();
      return res.status(200).json({ success: true, alerts });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error fetching alerts", error });
    }
  };
}   
