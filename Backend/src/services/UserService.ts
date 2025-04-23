// src/services/UserService.ts
import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../models/User";
import { hashPassword } from "../utils/hashPassword";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { IUserService } from "../interfaces/services/IUserService";

const JWT_SECRET = process.env.JWT_SECRET || "sfkjPIFfjfipa";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "someSuperSecretRefreshTokenKey";

export class UserService implements IUserService {
  private userRepository: UserRepository;
  private otps: Map<string, { otp: string; expiresAt: number }>;
  private transporter: nodemailer.Transporter;
  private forgotOtps: Map<string, string>;

  constructor() {
    this.userRepository = new UserRepository();
    this.otps = new Map(); // Temporary storage, replace with Redis or DB for production
    this.forgotOtps = new Map();

    // Setup nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "adithyanshajilal@gmail.com", // Replace with environment variables
        pass: "mrkf xbae pqqa hmxh",
      },
    });
  }

  // Method to generate access token
  private generateAccessToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "5h" }
    );
  }

  // Method to generate refresh token
  private generateRefreshToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
  }

  async generateOtp(
    email: string,
    username: string,
    password: string,
    latitude: number,
    longitude: number,
    role: "admin" | "user" = "user"
  ): Promise<string> {
    try {
      const existingUser = await this.userRepository.findUserByEmail(email);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = Date.now() + 30 * 1000;
      this.otps.set(email, { otp, expiresAt });
console.log(otp,"first")
      await this.sendOtpEmail(email, otp);
      return otp;
    } catch (error: any) {
      throw new Error(`Error generating OTP: ${error.message}`);
    }
  }

  private async sendOtpEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Your OTP for Account Verification",
      text: `Your OTP for signing up is: ${otp}. Please use this to complete your registration.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}`);
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw new Error("Could not send OTP email");
    }
  }

  async verifyOtp(
    email: string,
    otp: string,
    username?: string,
    password?: string,
    latitude?: number,
    longitude?: number,
    role: "admin" | "user" = "user"
  ): Promise<{ user: IUser; token: string }> {
    try { 
      // Validate OTP
      const otpData = this.otps.get(email);
      if (!otpData) {
        throw new Error("Invalid or expired OTP.");
      }
  
      const { otp: storedOtp, expiresAt } = otpData;
  
      if (Date.now() > expiresAt) {
        this.otps.delete(email);
        throw new Error("OTP has expired.");
      }
  
      if (storedOtp !== otp) {
        throw new Error("Invalid OTP.");
      }
      
      let user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        
        if (
          !username ||
          !password ||
          latitude === undefined ||
          longitude === undefined
        ) {
          throw new Error("Missing user data for signup");
        }

        
        const hashedPassword = await hashPassword(password);

        
        const newUser: Partial<IUser> = {
          username,
          email,
          password: hashedPassword,
          location: { latitude, longitude },
          role,
        };

        user = await this.userRepository.create(newUser as IUser); // Use the `create` method from BaseRepository
      }

      
      this.otps.delete(email);

      // Generate access token
      const token = this.generateAccessToken(user);
      return { user, token };
    } catch (error: any) {
      console.error("Error verifying OTP:", error.message);
      throw new Error(`Error verifying OTP: ${error.message}`);
    }
  }

  async login(
    email: string,
    password: string,
    latitude: number,
    longitude: number
  ): Promise<{ user: IUser; token: string; refreshToken: string }> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.isBlocked) {
        throw {
          status: 403,
          message: "Your account has been blocked by the admin",
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      user.location = { latitude, longitude };
      await user.save();

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      user.refreshToken = refreshToken;
      await user.save();

      const userWithId = {
        ...user.toObject(),
        id: user._id,
      };

      return { user: userWithId, token: accessToken, refreshToken };
    } catch (error: any) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }

  async refreshToken(
    oldRefreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const decoded = jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET) as any;
      const user = await this.userRepository.getUserById(decoded.id);

      if (!user || user.refreshToken !== oldRefreshToken) {
        throw new Error("Invalid refresh token");
      }

      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
        expiresIn: "30d",
      });

      user.refreshToken = newRefreshToken;
      await user.save();

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
      throw new Error(`Error refreshing token: ${error.message}`);
    }
  }

  async generateForgotPasswordOtp(email: string): Promise<string> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) throw new Error("User with this email does not exist");

      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      this.forgotOtps.set(email, otp);

      await this.sendForgotPasswordOtp(email, otp);
      return otp;
    } catch (error: any) {
      throw new Error(`Error generating forgot password OTP: ${error.message}`);
    }
  }

  private async sendForgotPasswordOtp(
    email: string,
    otp: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Forgot Password OTP",
      text: `Your OTP for resetting your password is: ${otp}.`,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error: any) {
      throw new Error(`Error sending forgot password OTP: ${error.message}`);
    }
  }

  async verifyForgotPasswordOtp(email: string, otp: string): Promise<void> {
    try {
      const storedOtp = this.forgotOtps.get(email);
      if (storedOtp !== otp) throw new Error("Invalid OTP");

      this.forgotOtps.delete(email);
    } catch (error: any) {
      throw new Error(`Error verifying forgot password OTP: ${error.message}`);
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepository.updatePasswordByEmail(email, hashedPassword);
    } catch (error: any) {
      throw new Error(`Error resetting password: ${error.message}`);
    }
  }

  async resendOtp(email: string): Promise<string> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 30 * 1000;
    this.otps.set(email, {expiresAt,otp}); 
    await this.sendOtpEmail(email, otp); 
    return otp;
}


  async getUserProfile(userId: string): Promise<IUser | null> {
    try {
      return this.userRepository.getUserById(userId);
    } catch (error: any) {
      throw new Error(`Error getting user profile: ${error.message}`);
    }
  }

  async updateUserProfile(
    userId: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      return this.userRepository.updateUser(userId, data);
    } catch (error: any) {
      throw new Error(`Error updating user profile: ${error.message}`);
    }
  }
  async toggleUserStatus(
    userId: string,
    isBlocked: boolean
  ): Promise<IUser | null> {
    try {
      return await this.userRepository.updateUser(userId, { isBlocked });
    } catch (error: any) {
      throw new Error(`Error toggling user status: ${error.message}`);
    }
  }

  // Get all users logic
  async getAllUsers(): Promise<IUser[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error: any) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  }
  async getUserById(userId: string): Promise<IUser | null> {
    return this.userRepository.getUserById(userId);
  }
  async linkVolunteerToUser(
    userId: string,
    volunteerId: string
  ): Promise<void> {
    await this.userRepository.linkVolunteer(userId, volunteerId); // This should call a repository method that handles linking
  }
  async getUserByid(userId: string): Promise<IUser | null> {
    return this.userRepository.getUserById(userId);
  }
}
