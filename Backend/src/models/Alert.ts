// src/models/Alert.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  alertType: string;
  severity: string;
  source: string;  // 'custom' or 'GDACS'
  createdAt: Date;  // Add this
  updatedAt: Date; 
}

const AlertSchema = new Schema<IAlert>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  alertType: { type: String, required: true },
  severity: { type: String, required: true },
  source: { type: String, required: true, enum: ['custom', 'GDACS'] }
}, { timestamps: true });

export const Alert = mongoose.model<IAlert>('Alert', AlertSchema);
