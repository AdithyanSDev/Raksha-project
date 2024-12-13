// src/repositories/UserRepository.ts
import { User, IUser } from '../models/User';
import { BaseRepository } from './BaseRepository';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User); // Pass the User model to the BaseRepository
  }
  async createUser(data: Partial<IUser>): Promise<IUser> {
    try {
      return await this.create(data); // Call the `create` method from BaseRepository
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  
  // Override or implement additional methods specific to the UserRepository
  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.model.findOne({ email });
    } catch (error:any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async getUserById(userId: string): Promise<IUser | null> {
    try {
      return await this.findById(userId);
    } catch (error:any) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      return await this.updateById(userId, userData);
    } catch (error:any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async updatePasswordByEmail(email: string, newPassword: string): Promise<void> {
    try {
      await this.model.updateOne({ email }, { password: newPassword });
    } catch (error:any) {
      throw new Error(`Error updating password by email: ${error.message}`);
    }
  }

  async linkVolunteer(userId: string, volunteerId: string): Promise<void> {
    try {
      await this.model.findByIdAndUpdate(userId, { volunteerId }, { new: true });
    } catch (error:any) {
      throw new Error(`Error linking volunteer: ${error.message}`);
    }
  }

  async updateUserStatus(userId: string, isBlocked: boolean): Promise<IUser | null> {
    try {
      return await this.updateById(userId, { isBlocked });
    } catch (error:any) {
      throw new Error(`Error updating user status: ${error.message}`);
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      return await this.findAll(); // Reuse the findAll method from BaseRepository
    } catch (error:any) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  }
}
