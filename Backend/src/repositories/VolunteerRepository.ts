import { IUser, User } from '../models/User';
import { Volunteer, IVolunteer } from '../models/Volunteer';

export class VolunteerRepository {
  async createVolunteer(volunteerData: Partial<IVolunteer>): Promise<IVolunteer> {
    const volunteer = new Volunteer(volunteerData);
    return await volunteer.save();
  }
  async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);  // Assuming Mongoose for user model
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async getVolunteerByUserId(userId: string): Promise<IVolunteer | null> {
    return await Volunteer.findOne({ userId }).populate('userId');
  }

  async updateVolunteer(userId: string, updateData: Partial<IVolunteer>): Promise<IVolunteer | null> {
    return await Volunteer.findOneAndUpdate({ userId }, updateData, { new: true });
  }

  async getVolunteers(): Promise<IVolunteer[]> {
    return await Volunteer.find().populate('userId');
  }

  async deleteVolunteer(userId: string): Promise<void> {
    await Volunteer.findOneAndDelete({ userId });
  }

  // New methods added below
  async getAllVolunteers(): Promise<IVolunteer[]> {
    try {
        return await Volunteer.find(); // Query the database for all volunteers
    } catch (error: any) {
        throw new Error(`Failed to fetch all volunteers: ${error.message}`);
    }
}
  // Get volunteers by status
  async getVolunteersByStatus(status: 'Requested' | 'Approved' | 'Rejected'): Promise<IVolunteer[]> {
    return await Volunteer.find({ status }).populate('userId');
  }

  // Update volunteer status
  async updateVolunteerStatus(volunteerId: string, status: 'Requested' | 'Approved' | 'Rejected'): Promise<IVolunteer | null> {
    console.log("haiii","repo")
    return await Volunteer.findByIdAndUpdate(volunteerId, { status }, { new: true });
  }
  async findByVolunteerIdAndStatus(volunteerId: string, status: 'Requested' | 'Approved' | 'Rejected'): Promise<IVolunteer | null> {
    try {
        return await Volunteer.findOne({ _id: volunteerId, status });
    } catch (error: any) {
        throw new Error('Error in VolunteerRepository: ' + error.message);
    }
  }
}
