import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterialDonation extends Document {
    donorName: string;
    item: string;
    quantity: number;
    cancelReason?:string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    userId: mongoose.Types.ObjectId;
    images: string[]; // Array of image URLs
}

const MaterialDonationSchema: Schema = new Schema({
    donorName: { type: String, required: true },
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
    cancelReason: { type: String, required: false }, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }], // Array to store URLs or paths of images
});

export default mongoose.model<IMaterialDonation>('MaterialDonation', MaterialDonationSchema);
