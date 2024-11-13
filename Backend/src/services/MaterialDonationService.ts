import { IMaterialDonation } from '../models/MaterialDonation';
import MaterialDonationRepository from '../repositories/MaterialDonationRepository';

class MaterialDonationService {
    async createMaterialDonation(donorName: string, item: string, quantity: number, images: string[], userId: string) {
        return await MaterialDonationRepository.create(donorName, item, quantity, userId, images);
    }
    

    async getApprovedDonations(): Promise<IMaterialDonation[]> {
        return await MaterialDonationRepository.findApprovedDonations();
      }
    
      async getPendingDonations(): Promise<IMaterialDonation[]> {
        return await MaterialDonationRepository.findPendingDonations();
      }
    
      async changeDonationStatus(id: string, status: 'approved' | 'rejected'): Promise<IMaterialDonation | null> {
        return await MaterialDonationRepository.updateDonationStatus(id, status);
      }
}

export default new MaterialDonationService();
