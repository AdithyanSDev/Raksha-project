// models/MonetaryDonation.ts
import mongoose, { Schema, Document } from 'mongoose';

interface MonetaryDonationDocument extends Document {
    userId: string;
    donorName: string;
    donationType: 'one-time' | 'monthly';
    paymentMethod: 'credit_card' | 'upi' | 'razorpay';
    amount: number;
    coverFees: number; 
    razorpayOrderId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const MonetaryDonationSchema = new Schema<MonetaryDonationDocument>({
    userId: { type: String, required: true },
    donorName: { type: String, required: true },
    donationType: { type: String, enum: ['one-time', 'monthly'], required: true },
    paymentMethod: { type: String, enum: ['credit_card', 'upi', 'razorpay'], required: true },
    amount: { type: Number, required: true },
    coverFees: { type: Number, default: 0 }, 
    razorpayOrderId: { type: String },
}, { timestamps: true });

export const MonetaryDonation = mongoose.model<MonetaryDonationDocument>('MonetaryDonation', MonetaryDonationSchema);
