// src/interfaces/repositories/IUserRepository.ts
import { IUser } from "../../models/User";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  getUserById(userId: string): Promise<IUser | null>;
  updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;
  updatePasswordByEmail(email: string, newPassword: string): Promise<void>;
  linkVolunteer(userId: string, volunteerId: string): Promise<void>;
  updateUserStatus(userId: string, isBlocked: boolean): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
}
