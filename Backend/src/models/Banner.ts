// src/models/Banner.ts
import { Schema, model, Document } from 'mongoose';

export interface IBanner extends Document {
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
    {
        imageUrl: { type: String, required: true },
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt`
    }
);

const Banner = model<IBanner>('Banner', bannerSchema);

export default Banner;
