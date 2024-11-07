import MaterialDonation, { IMaterialDonation } from '../models/MaterialDonation';

class MaterialDonationRepository {
    async create(donorName: string, item: string, quantity: number, userId: string, images: string[]) {
        const donation = new MaterialDonation({ donorName, item, quantity, userId, images });
        console.log(donation,"donation")
        return await donation.save();
    }
    async updateStatus(donationId: string, status: string): Promise<IMaterialDonation | null> {
        // Find the donation by ID and update its status
        return await MaterialDonation.findByIdAndUpdate(donationId, { status }, { new: true });
    }

    async getAll(): Promise<IMaterialDonation[]> {
        // Get all material donations
        return await MaterialDonation.find({});
    }
}

export default new MaterialDonationRepository();
