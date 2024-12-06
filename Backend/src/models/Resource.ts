// models/Resource.ts
import mongoose, { Document } from 'mongoose';

export interface IResource extends Document {
  name: string;
  type: string;
  quantity: number;
  location: string;
  description: string;
  available: boolean;
  image: string; 
}

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, 
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String },
  available: { type: Boolean, default: true },
  image: { type: String }, // Add this field to save the image URL
}, {
  timestamps: true
});

export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);



