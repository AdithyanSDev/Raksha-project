// MaterialDonationController.ts
import { Request, Response } from 'express';
import MaterialDonationService from '../services/MaterialDonationService';
import { User } from '../models/User';

interface MaterialDonationBody {
    item: string;
    quantity: number;
    userId: string; // Expect userId in the request body
}

class MaterialDonationController {
    async createMaterialDonation(req: Request, res: Response) {
        const { itemName, quantity, userId } = req.body;
        
        // Extract image URLs from uploaded files
        const images = req.files ? (req.files as Express.MulterS3.File[]).map(file => file.location) : [];

        try {
            const user = await User.findById(userId);
            if (!user || !user.username) {
                return res.status(404).json({ error: 'User not found or missing username' });
            }

            const donorName = user.username;
            const donation = await MaterialDonationService.createMaterialDonation(donorName, itemName, quantity, images, userId)
            console.log(donation);
            res.status(201).json(donation);
        } catch (error) {
            res.status(500).json({ error: 'Error creating material donation' });
        }
    }

    async getApprovedDonations(req: Request, res: Response) {
        try {
          const donations = await MaterialDonationService.getApprovedDonations();
          res.json(donations);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch approved donations' });
        }
      }
    
      async getPendingDonations(req: Request, res: Response) {
        try {
          const donations = await MaterialDonationService.getPendingDonations();
          res.json(donations);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch pending donations' });
        }
      }
    
      async updateDonationStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status, cancelReason } = req.body;
      
        try {
          const updatedDonation = await MaterialDonationService.changeDonationStatus(
            id,
            status,
            cancelReason
          );
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
