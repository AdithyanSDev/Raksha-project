// models/EmergencyAlert.ts

import mongoose, { Schema, Document } from 'mongoose';

interface EmergencyAlertDocument extends Document {
  userId: string; // Reference to the user who reported the emergency
  name: string;
  email: string;
  phone: string;
  location: string;
  timestamp: Date;
}

const EmergencyAlertSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const EmergencyAlert = mongoose.model<EmergencyAlertDocument>('EmergencyAlert', EmergencyAlertSchema);

export default EmergencyAlert;
