import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
    _id: mongoose.Schema.Types.ObjectId;  // Add _id explicitly
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
    role: string;
    skills: string[];
    experience: number;
    location: {
        latitude: number;
        longitude: number;
    };
    availabilityStatus: 'Available' | 'Busy' | 'Inactive';
    tasks: string[];
    status: 'Requested' | 'Approved' | 'Rejected';
}

const VolunteerSchema = new Schema<IVolunteer>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    role: { type: String, required: true },
    skills: { type: [String], required: true },
    experience: { type: Number, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    availabilityStatus: { type: String, enum: ['Available', 'Busy', 'Inactive'], default: 'Available' },
    tasks: [{ type: String }],
    status: { type: String, enum: ['Requested', 'Approved', 'Rejected'], default: 'Requested' }
}, {
    timestamps: true
});

export const Volunteer = mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
