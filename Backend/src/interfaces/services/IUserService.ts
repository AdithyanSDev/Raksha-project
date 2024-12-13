// src/interfaces/services/IUserService.ts
import { IUser } from "../../models/User";

export interface IUserService {
  generateOtp(email: string, username: string, password: string, latitude: number, longitude: number, role: "admin" | "user"): Promise<string>;
  verifyOtp(email: string, otp: string, username: string, password: string, latitude: number, longitude: number, role: "admin" | "user"): Promise<{ user: IUser; token: string }>;
  login(email: string, password: string, latitude: number, longitude: number): Promise<{ user: IUser; token: string; refreshToken: string }>;
}
