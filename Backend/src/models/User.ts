import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    location: {
        latitude: number;
        longitude: number;
    };
    gender?: string;
    age?: number;
    phoneNumber?: string;
    profilePicture?: string; 
    volunteerId?: mongoose.Schema.Types.ObjectId; // Changed to ObjectId for proper referencing
    role: 'admin' | 'user';
    refreshToken?: string; 
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    gender: { type: String, default: '' },
    age: { type: Number, default: 0 },
    phoneNumber: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', default: null }, // Changed to ObjectId and reference
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    refreshToken: { type: String },
}, {
    timestamps: true
});

// Export the User model
export const User = model<IUser>('User', UserSchema);
