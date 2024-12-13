import { Request, Response } from 'express';

export interface IMaterialDonationController {
  createMaterialDonation(req: Request, res: Response): Promise<void>;
  getApprovedDonations(req: Request, res: Response): Promise<void>;
  getPendingDonations(req: Request, res: Response): Promise<void>;
  updateDonationStatus(req: Request, res: Response): Promise<void>;
}
