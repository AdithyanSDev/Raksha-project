import { Request, Response } from 'express';
import MonetaryDonationService from '../services/MonetaryDonationService';
import { User } from '../models/User';

interface MonetaryOrderBody {
    amount: number;
    paymentMethod: 'credit_card' | 'upi' | 'razorpay';
    donationType: 'one-time' | 'monthly';
    userId: string;
    coverFees?: boolean; // This will be calculated in the controller
}

class MonetaryDonationController {
    async createOrder(req: Request & { body: MonetaryOrderBody }, res: Response) {
        const { amount, paymentMethod, donationType, userId, coverFees } = req.body;
        console.log(req.body)
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: Missing userId' });
        }

        try {
            const user = await User.findById(userId);
            console.log(user)
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const donorName = user.username;
            console.log(donorName,"name")
            // Initialize total amount to be paid
            let totalAmount = amount;
            let coverFeesAmount = 0; // Initialize cover fees amount

            // If coverFees is true, calculate the additional fee
            if (coverFees) {
                coverFeesAmount = Math.floor(amount / 100) * 5; // Calculate cover fees based on amount
                totalAmount += coverFeesAmount; // Add cover fees to total amount
            }

            const paymentOrder = await MonetaryDonationService.createPaymentOrder(
                donorName,
                totalAmount, // Pass the total amount including cover fees if applicable
                userId,
                donationType,
                paymentMethod,
                coverFeesAmount // Pass calculated cover fees as a number
            );

            res.json(paymentOrder);
        } catch (error) {
            console.error("Create Order Error:", error);
            res.status(500).json({ error: 'Error creating order' });
        }
    }

    async verifyPayment(req: Request, res: Response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        console.log("Received verification data:", req.body);  // Log received data
    
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({ error: "Missing required verification fields" });
        }
    
        try {
            const isValid = await MonetaryDonationService.verifyRazorpayPayment(
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature
            );
    
            if (isValid) {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ error: "Payment verification failed" });
            }
        } catch (error) {
            console.error("Verification Error:", error);  // Log verification error
            res.status(500).json({ error: "Error in payment verification" });
        }
    }
    async getAllMonetaryDonations(req: Request, res: Response) {
        try {
            const donations = await MonetaryDonationService.getAllMonetaryDonations();
            res.status(200).json(donations);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching monetary donations' });
        }
    }
    
}

export default new MonetaryDonationController();
