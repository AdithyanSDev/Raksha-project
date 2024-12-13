import { BaseRepository } from './BaseRepository';
import MaterialDonation, { IMaterialDonation } from '../models/MaterialDonation';
import { IMaterialDonationRepository } from '../interfaces/repositories/IMaterialDonationRepository';

class MaterialDonationRepository extends BaseRepository<IMaterialDonation> implements IMaterialDonationRepository {
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
