import mongoose from 'mongoose';
import MaterialDonationRepository from '../repositories/MaterialDonationRepository';
import { CreateMaterialDonationDTO, UpdateMaterialDonationStatusDTO } from '../dtos/MaterialDonationDTO';
import { IMaterialDonation } from '../models/MaterialDonation';

class MaterialDonationService {
  async createMaterialDonation(data: CreateMaterialDonationDTO): Promise<IMaterialDonation> {
    const { donorName, item, quantity, userId, images } = data;

    // Convert userId from string to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    return await MaterialDonationRepository.create({
      donorName,
      item,
      quantity,
      userId: objectIdUserId,
      images,
    });
  }

  async getApprovedDonations(): Promise<IMaterialDonation[]> {
    return await MaterialDonationRepository.findApprovedDonations();
  }

  async getPendingDonations(): Promise<IMaterialDonation[]> {
    return await MaterialDonationRepository.findPendingDonations();
  }

  async changeDonationStatus(id: string, updateData: UpdateMaterialDonationStatusDTO): Promise<IMaterialDonation | null> {
    return await MaterialDonationRepository.updateById(id, updateData);
  }
}

export default new MaterialDonationService();
