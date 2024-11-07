// src/services/UserService.ts

import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../models/User";
import { hashPassword } from "../utils/hashPassword";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "sfkjPIFfjfipa";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "someSuperSecretRefreshTokenKey";

export class UserService {
  // Method to generate access token
  generateAccessToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "5h" }
    );
  }

  // Method to generate refresh token
  generateRefreshToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
  }
  static getUserByid(userId: any) {
    throw new Error("Method not implemented.");
  }
  private userRepository: UserRepository;
  private otps: Map<string, string>; // Temporary storage for OTPs
  private transporter: nodemailer.Transporter;

  constructor() {
    this.userRepository = new UserRepository();
    this.otps = new Map(); // In-memory storage, ideally replace with Redis or database

    // Setup nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Use 465 for secure connections
      secure: true, // Use true for port 465
      auth: {
        user: "adithyanshajilal@gmail.com",
        pass: "mrkf xbae pqqa hmxh",
      },
    });
  }

  async generateOtp(
    email: string,
    username: string,
    password: string,
    latitude: number,
    longitude: number,
    role: "admin" | "user" = "user" // Default to user
  ): Promise<string> {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    this.otps.set(email, otp); // Store OTP in memory (temporary solution)

    // Send OTP via email
    await this.sendOtpEmail(email, otp);
    return otp; // Return OTP for testing purposes, not in production
  }

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    console.log("Helloo");
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Your OTP for Account Verification",
      text: `Your OTP for signing up is: ${otp}. Please use this to complete your registration.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}`);
      console.log(otp);
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
    role: "admin" | "user" = "user" // Default to user
  ): Promise<{ user: IUser; token: string }> {
    const storedOtp = this.otps.get(email);
    if (storedOtp !== otp) {
      throw new Error("Invalid OTP");
    }

    // Check if the user already exists
    let user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      // If the user doesn't exist, create a new user
      if (
        !username ||
        !password ||
        latitude === undefined ||
        longitude === undefined
      ) {
        throw new Error("Missing user data for signup");
      }

      const hashedPassword = await hashPassword(password);
      const newUser = {
        username,
        email,
        password: hashedPassword,
        location: { latitude, longitude },
        role, // Assign role during signup
      } as IUser;

      user = await this.userRepository.createUser(newUser);
    }

    // Remove OTP from storage after verification
    this.otps.delete(email);

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "5h" }
    );
    console.log(user.id, "afod0idfde");

    return { user, token };
  }

  async signup(
    username: string,
    email: string,
    password: string,
    latitude: number,
    longitude: number
  ): Promise<{ user: IUser; token: string }> {
    const hashedPassword = await hashPassword(password);

    const user = {
      username,
      email,
      password: hashedPassword,
      location: { latitude, longitude },
    } as IUser;

    const createdUser = await this.userRepository.createUser(user);

    const token = jwt.sign(
      { id: createdUser._id, email: createdUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { user: createdUser, token };
  }

  async login(
    email: string,
    password: string,
    latitude: number,
    longitude: number
  ): Promise<{ user: IUser; token: string; refreshToken: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    user.location = { latitude, longitude };
    await user.save();

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    const userWithId = {
      ...user.toObject(),
      id: user._id,
    };

    return { user: userWithId, token: accessToken, refreshToken };
  }

  async refreshToken(
    oldRefreshToken: string
  ): Promise<{ accessToken: string }> {
    // Verify refresh token
    const decoded = jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET) as any;

    // Find the user based on the token data
    const user = await this.userRepository.getUserById(decoded.id);
    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new Error("Invalid refresh token");
    }

    // Generate new access token
    const newAccessToken = this.generateAccessToken(user);

    return { accessToken: newAccessToken };
  }
  async getUserProfile(userId: string): Promise<IUser | null> {
    console.log(userId, "userid");
    return this.userRepository.getUserById(userId);
  }

  async updateUserProfile(
    userId: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return this.userRepository.updateUser(userId, data);
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
