import { User, IUser } from '../models/User';

export class UserRepository {
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const newUser = new User(userData);
        return await newUser.save();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }
    async getUserById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, userData, { new: true });
    }
    async updatePasswordByEmail(email: string, newPassword: string): Promise<void> {
        await User.updateOne({ email }, { password: newPassword });
      }
    async linkVolunteer(userId: string, volunteerId: string): Promise<void> {
        await User.findByIdAndUpdate(userId, { volunteerId }, { new: true });
    }
    async getUserByid(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }
    async updateUserStatus(userId: string, isBlocked: boolean): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, { isBlocked }, { new: true });
    }
    async getAllUsers(): Promise<IUser[]> {
        return await User.find(); // Modify query if you want to apply filters
    }
}
