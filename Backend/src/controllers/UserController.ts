import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserDTO } from "../dtos/UserDTO";
import { validate } from "class-validator";
import s3 from "../config/awsS3";
import { User } from "../models/User";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  signup = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password, latitude, longitude, role } = req.body; // Include role

    // Validate request data
    const userDTO = new UserDTO();
    userDTO.username = username;
    userDTO.email = email;
    userDTO.password = password;

    const errors = await validate(userDTO);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const otp = await this.userService.generateOtp(
        email,
        username,
        password,
        latitude,
        longitude,
        role
      );
      // Simulate sending OTP via email
      return res.status(200).json({ message: "OTP sent to email", otp });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  verifyOtp = async (req: Request, res: Response): Promise<Response> => {
    const { email, otp, username, password, latitude, longitude, role } =
      req.body; // Include role

    try {
      const { user, token } = await this.userService.verifyOtp(
        email,
        otp,
        username,
        password,
        latitude,
        longitude,
        role
      );
      return res.status(200).json({ user, token });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, latitude, longitude } = req.body;
    console.log(req.body)
    if (!email || !password || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: 'Email, password, latitude, and longitude are required.',
      });
    }

    try {
      const { user, token, refreshToken } = await this.userService.login(
        email,
        password,
        latitude,
        longitude
      );
      console.log(user)
      return res.status(200).json({ user, token, refreshToken });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };


  // Route to refresh access token
  refreshToken = async (req: Request, res: Response): Promise<Response> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
      const { accessToken } = await this.userService.refreshToken(refreshToken);
      return res.status(200).json({ accessToken });
    } catch (error: any) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  };

  // Fetch User Profile Controller Method
  getUserProfile = async (req: Request, res: Response): Promise<Response> => {
    const userId = (req as any).user.id;

    try {
      const user = await this.userService.getUserProfile(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error fetching user profile", error });
    }
  };

  // Update User Profile Controller Method
  updateUserProfile = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = (req as any).user.id;
    const updatedData = req.body;

    try {
      const updatedUser = await this.userService.updateUserProfile(
        userId,
        updatedData
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(updatedUser);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error updating user profile", error });
    }
  };

  uploadProfilePicture = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileLocation = (req.file as any).location; // Ensure this is the correct location property

    try {
      const updatedUser = await this.userService.updateUserProfile(userId, {
        profilePicture: fileLocation,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({
          message: "Profile picture uploaded successfully",
          user: updatedUser,
        });
    } catch (error: any) {
      console.error("Error updating profile picture:", error);
      return res
        .status(500)
        .json({ message: "Error updating profile picture", error });
    }
  };

  toggleUserStatus = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.userId;
    const { isBlocked } = req.body;

    try {
        const updatedUser = await this.userService.toggleUserStatus(userId, isBlocked);
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(updatedUser);
    } catch (error: any) {
        return res.status(500).json({ message: "Error toggling user status", error });
    }
};

getAllUsers = async (req: Request, res: Response) => {
  try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
  }
};
 // Forgot Password - Send OTP
 forgotPassword = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;
 console.log(email)
  try {
    const otp = await this.userService.generateForgotPasswordOtp(email);
    return res.status(200).json({ message: "OTP sent to email", otp });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Verify OTP for Forgot Password
verifyForgotOtp = async (req: Request, res: Response): Promise<Response> => {
  const { email, otp } = req.body;

  try {
    await this.userService.verifyForgotPasswordOtp(email, otp);
    return res.status(200).json({ message: "OTP verified" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Reset Password
resetPassword = async (req: Request, res: Response): Promise<Response> => {
  const { email, newPassword } = req.body;

  try {
    await this.userService.resetPassword(email, newPassword);
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
}
