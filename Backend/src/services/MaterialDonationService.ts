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
    
      async changeDonationStatus(
        id: string,
        status: 'approved' | 'rejected',
        cancelReason?: string
      ) {
        // Build the update fields based on the status
        const updateFields: { status: string; cancelReason?: string } = { status };
      
        // Add cancelReason only if status is 'rejected' and cancelReason is provided
        if (status === 'rejected' && cancelReason) {
          updateFields.cancelReason = cancelReason;
        }
      
        // Pass updateFields to the repository function
        return await MaterialDonationRepository.updateDonationStatus(id, updateFields);
      }
      

}

export default new MaterialDonationService();
