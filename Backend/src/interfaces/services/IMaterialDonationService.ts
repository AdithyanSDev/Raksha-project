import { CreateMaterialDonationDTO, UpdateMaterialDonationStatusDTO } from '../../dtos/MaterialDonationDTO';
import { IMaterialDonation } from '../../models/MaterialDonation';

export interface IMaterialDonationService {
  createMaterialDonation(data: CreateMaterialDonationDTO): Promise<IMaterialDonation>;
  getApprovedDonations(): Promise<IMaterialDonation[]>;
  getPendingDonations(): Promise<IMaterialDonation[]>;
  changeDonationStatus(id: string, updateData: UpdateMaterialDonationStatusDTO): Promise<IMaterialDonation | null>;
}
