import MaterialDonationRepository from '../repositories/MaterialDonationRepository';

class MaterialDonationService {
    async createMaterialDonation(donorName: string, item: string, quantity: number, images: string[], userId: string) {
        return await MaterialDonationRepository.create(donorName, item, quantity, userId, images);
    }
    

    async approveDonation(donationId: string) {
        // Call repository method to update status to 'approved'
        return await MaterialDonationRepository.updateStatus(donationId, 'approved');
    }

    async rejectDonation(donationId: string) {
        // Call repository method to update status to 'rejected'
        return await MaterialDonationRepository.updateStatus(donationId, 'rejected');
    }
}

export default new MaterialDonationService();
