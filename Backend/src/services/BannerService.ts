// src/services/BannerService.ts
import BannerRepository from '../repositories/BannerRepository';

class BannerService {
    async uploadBanner(imageUrl: string) {
        const existingBanner = await BannerRepository.getBanner();
        if (existingBanner) {
            return await BannerRepository.updateBanner(imageUrl);
        }
        return await BannerRepository.createBanner(imageUrl);
    }

    async getBanner() {
        return await BannerRepository.getBanner();
    }
}

export default new BannerService();
