// src/repositories/BannerRepository.ts
import Banner, { IBanner } from '../models/Banner'; // Import both Banner and IBanner

class BannerRepository {
    async createBanner(imageUrl: string): Promise<IBanner> {
        const banner = new Banner({ imageUrl });
        return await banner.save();
    }

    async getBanner(): Promise<IBanner | null> {
        return await Banner.findOne();
    }

    async updateBanner(imageUrl: string): Promise<IBanner | null> {
        return await Banner.findOneAndUpdate({}, { imageUrl }, { new: true });
    }
}

export default new BannerRepository();
