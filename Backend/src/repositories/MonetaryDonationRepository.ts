import { MonetaryDonation } from '../models/MonetaryDonation';

class MonetaryDonationRepository {
    async create(donationData: {
        userId: string;
        donorName: string;
        donationType: 'one-time' | 'monthly';
        paymentMethod: 'credit_card' | 'upi' | 'razorpay';
        amount: number;
        coverFees: number;
        razorpayOrderId?: string | null;
    }) {
        console.log(donationData,"donation data")
        return MonetaryDonation.create(donationData);
        
    }
    async getAll() {
        return await MonetaryDonation.find({});
    }
    // Additional repository methods can go here
}

export default new MonetaryDonationRepository();
