import { IMaterialDonation } from '../../models/MaterialDonation';

export interface IMaterialDonationRepository {
  create(data: Partial<IMaterialDonation>): Promise<IMaterialDonation>;
  findApprovedDonations(): Promise<IMaterialDonation[]>;
  findPendingDonations(): Promise<IMaterialDonation[]>;
  updateById(id: string, data: Partial<IMaterialDonation>): Promise<IMaterialDonation | null>;
}
