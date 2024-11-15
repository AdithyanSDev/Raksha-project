import MaterialDonation, { IMaterialDonation } from '../models/MaterialDonation';

class MaterialDonationRepository {
    async create(donorName: string, item: string, quantity: number, userId: string, images: string[]) {
        const donation = new MaterialDonation({ donorName, item, quantity, userId, images });
        console.log(donation,"donation")
        return await donation.save();
    }
    async findApprovedDonations(): Promise<IMaterialDonation[]> {
        return await MaterialDonation.find({ status: 'approved' });
      }
    
      async findPendingDonations(): Promise<IMaterialDonation[]> {
        return await MaterialDonation.find({ status: 'pending' });
      }
    
      async updateDonationStatus(id: string, status: 'approved' | 'rejected'): Promise<IMaterialDonation | null> {
        return await MaterialDonation.findByIdAndUpdate(id, { status }, { new: true });
      }
}

export default new MaterialDonationRepository();
