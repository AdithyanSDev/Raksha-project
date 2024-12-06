import { BaseRepository } from './BaseRepository';
import MaterialDonation, { IMaterialDonation } from '../models/MaterialDonation';

class MaterialDonationRepository extends BaseRepository<IMaterialDonation> {
  constructor() {
    super(MaterialDonation);
  }

  async findApprovedDonations(): Promise<IMaterialDonation[]> {
    return await MaterialDonation.find({ status: 'approved' });
  }

  async findPendingDonations(): Promise<IMaterialDonation[]> {
    return await MaterialDonation.find({ status: 'pending' });
  }
}

export default new MaterialDonationRepository();
