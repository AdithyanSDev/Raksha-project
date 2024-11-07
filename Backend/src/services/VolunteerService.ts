import { VolunteerRepository } from '../repositories/VolunteerRepository';
import { IVolunteer } from '../models/Volunteer';
import { IUser } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import mongoose from 'mongoose';

export class VolunteerService {
  private volunteerRepository: VolunteerRepository;
  private userRepository: UserRepository;

  constructor() {
    this.volunteerRepository = new VolunteerRepository();
    this.userRepository = new UserRepository();
  }

  async registerVolunteer(volunteerData: Partial<IVolunteer>): Promise<IVolunteer> {
    // Add any business logic, validations, or transformations needed before saving
    return await this.volunteerRepository.createVolunteer(volunteerData);
  }
   // Get user by ID
   async getUserById(userId: string): Promise<IUser | null> {
    return await this.userRepository.getUserById(userId);
  }

  async linkVolunteerToUser(userId: string, volunteerId: mongoose.Schema.Types.ObjectId): Promise<IUser | null> {
    return await this.userRepository.updateUser(userId, { volunteerId });
  }
  

  async getVolunteer(userId: string): Promise<IVolunteer | null> {
    // Fetch volunteer by userId
    return await this.volunteerRepository.getVolunteerByUserId(userId);
  }

  async updateVolunteer(userId: string, updateData: Partial<IVolunteer>): Promise<IVolunteer | null> {
    // Update volunteer info based on userId
    return await this.volunteerRepository.updateVolunteer(userId, updateData);
  }

  async getAllVolunteers(): Promise<IVolunteer[]> {
    // Get all volunteers
    return await this.volunteerRepository.getVolunteers();
  }

  async deleteVolunteer(userId: string): Promise<void> {
    // Delete volunteer by userId
    await this.volunteerRepository.deleteVolunteer(userId);
  }

  // New methods added below

  // Get volunteers by status
  async getVolunteersByStatus(status: 'Requested' | 'Approved' | 'Rejected'): Promise<IVolunteer[]> {
    return await this.volunteerRepository.getVolunteersByStatus(status);
  }

  // Update volunteer status
  async updateVolunteerStatus(volunteerId: string, status: 'Requested' | 'Approved' | 'Rejected'): Promise<IVolunteer | null> {
    console.log("haiii","servive")
    return await this.volunteerRepository.updateVolunteerStatus(volunteerId, status);
  }
  async checkIfUserIsApprovedVolunteer(volunteerId: string): Promise<boolean> {
    try {
        // Check if a volunteer with the given ID and 'Approved' status exists
        const volunteer = await this.volunteerRepository.findByVolunteerIdAndStatus(volunteerId, 'Approved');
        return volunteer ? true : false;
    } catch (error: any) {
        throw new Error('Error in VolunteerService: ' + error.message);
    }
  }
}
