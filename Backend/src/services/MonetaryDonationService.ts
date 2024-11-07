import MonetaryDonationRepository from '../repositories/MonetaryDonationRepository';
import razorpayInstance from '../config/razorpay';
import crypto from 'crypto';

class MonetaryDonationService {
    async createPaymentOrder(
        donorName: string,
        amount: number,
        userId: string,
        donationType: 'one-time' | 'monthly',
        paymentMethod: 'credit_card' | 'upi' | 'razorpay',
        coverFees: number // Ensure this is a number
    ) {
        const options = {
            amount: (amount + coverFees) * 100, // Include cover fees in the payment amount
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
        };

        console.log("haiiiiiiiiiiiiiiiiiiiiiiiiiiii")

        const response = paymentMethod === 'razorpay'
            ? await razorpayInstance.orders.create(options)
            : null;

        const newDonation = await MonetaryDonationRepository.create({
            userId,
            donorName,
            donationType,
            paymentMethod,
            amount,
            coverFees, // Store cover fees
            razorpayOrderId: response?.id || null,
        });

        return {
            razorpayOrderId: response?.id || null,
            donationId: newDonation._id,
        };
    }

    async verifyRazorpayPayment(paymentId: string, orderId: string, signature: string) {
        const secret = process.env.RAZORPAY_SECRET;
        if (!secret) throw new Error("RAZORPAY_SECRET is not defined");

        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        return generatedSignature === signature;
    }
}

export default new MonetaryDonationService();
