import { Request, Response } from "express";

export interface IUserController {
  signup(req: Request, res: Response): Promise<Response>;
  verifyOtp(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
  refreshToken(req: Request, res: Response): Promise<Response>;
  getUserProfile(req: Request, res: Response): Promise<Response>;
  updateUserProfile(req: Request, res: Response): Promise<Response>;
  uploadProfilePicture(req: Request, res: Response): Promise<Response>;
  toggleUserStatus(req: Request, res: Response): Promise<Response>;
  getAllUsers(req: Request, res: Response): Promise<Response>;
  forgotPassword(req: Request, res: Response): Promise<Response>;
  verifyForgotOtp(req: Request, res: Response): Promise<Response>;
  resetPassword(req: Request, res: Response): Promise<Response>;
}

