import { Request, Response } from 'express';
import MaterialDonationService from '../services/MaterialDonationService';
import { CreateMaterialDonationDTO, UpdateMaterialDonationStatusDTO } from '../dtos/MaterialDonationDTO';
import { User } from '../models/User';
import { IMaterialDonationController } from '../interfaces/controllers/IMaterialDonationController';

class MaterialDonationController implements IMaterialDonationController {
  async createMaterialDonation(req: Request, res: Response): Promise<void> {
    const { itemName, quantity, userId } = req.body;
    const images = req.files ? (req.files as Express.MulterS3.File[]).map(file => file.location) : [];

    try {
      const user = await User.findById(userId);
      if (!user || !user.username) {
        res.status(404).json({ error: 'User not found or missing username' });
        return;
      }

      const donationData: CreateMaterialDonationDTO = {
        donorName: user.username,
        item: itemName,
        quantity,
        userId,
        images,
      };

      const donation = await MaterialDonationService.createMaterialDonation(donationData);
      res.status(201).json(donation);
    } catch (error) {
      res.status(500).json({ error: 'Error creating material donation' });
    }
  }

  async getApprovedDonations(req: Request, res: Response): Promise<void> {
    try {
      const donations = await MaterialDonationService.getApprovedDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch approved donations' });
    }
  }

  async getPendingDonations(req: Request, res: Response): Promise<void> {
    try {
      const donations = await MaterialDonationService.getPendingDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pending donations' });
    }
  }

  async updateDonationStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, cancelReason } = req.body;

    try {
      const updateData: UpdateMaterialDonationStatusDTO = { status, cancelReason };
      const updatedDonation = await MaterialDonationService.changeDonationStatus(id, updateData);

      if (updatedDonation) {
        res.json(updatedDonation);
      } else {
        res.status(404).json({ error: 'Donation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update donation status' });
    }
  }
}

export default new MaterialDonationController();
