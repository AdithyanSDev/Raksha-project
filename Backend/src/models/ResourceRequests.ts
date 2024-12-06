import mongoose, { Document } from 'mongoose';

export interface IResourceRequest extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  resourceType: string;
  quantity: number;
  description: string;
  location: string;
  address: string;
  contactInfo: string;
  urgencyLevel: string;
  disasterType: string;
  numberOfPeopleAffected: number;
  additionalInfo?: string;
  documents?: string[];
  rejectionReason?: { type: String },
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
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectionReason: { type: String }, // Optional field for rejection reason
}, { timestamps: true });


export const ResourceRequest = mongoose.model<IResourceRequest>('ResourceRequest', ResourceRequestSchema);
