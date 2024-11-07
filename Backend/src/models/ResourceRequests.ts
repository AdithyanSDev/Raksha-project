// models/ResourceRequests.ts
import mongoose, { Document } from 'mongoose';

export interface IResourceRequest extends Document {
  userId: mongoose.Schema.Types.ObjectId; // To associate with the user
  resourceType: string;
  quantity: number;
  description: string;
  location: string;
  address: string;
  contactInfo: string;
  urgencyLevel: string; // New field
  disasterType: string; // New field
  numberOfPeopleAffected: number; // New field
  additionalInfo?: string; // Optional field
  documents?: string[]; // Array of document URLs (Optional)
}

const ResourceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceType: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  contactInfo: { type: String, required: true },
  urgencyLevel: { type: String, required: true }, 
  disasterType: { type: String, required: true }, 
  numberOfPeopleAffected: { type: Number, required: true }, 
  additionalInfo: { type: String }, 
  documents: [{ type: String }], 
});

export const ResourceRequest = mongoose.model<IResourceRequest>('ResourceRequest', ResourceRequestSchema);
