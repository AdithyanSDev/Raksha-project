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
    async linkVolunteer(userId: string, volunteerId: string): Promise<void> {
        await User.findByIdAndUpdate(userId, { volunteerId }, { new: true });
    }
    async getUserByid(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }
}
