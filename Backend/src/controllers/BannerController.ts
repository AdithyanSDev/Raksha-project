// src/controllers/BannerController.ts
import { Request, Response } from 'express';
import BannerService from '../services/BannerService';

class BannerController {
    async uploadBanner(req: Request, res: Response) {
        try {
            const imageUrl = (req.file as any).location;
            const banner = await BannerService.uploadBanner(imageUrl);
            res.status(201).json(banner);
        } catch (error) {
            res.status(500).json({ message: 'Failed to upload banner', error });
        }
    }

    async getBanner(req: Request, res: Response) {
        try {
            const banner = await BannerService.getBanner();
            if (banner) {
                res.status(200).json(banner);
            } else {
                res.status(404).json({ message: 'Banner not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching banner', error });
        }
    }
}

export default new BannerController();
