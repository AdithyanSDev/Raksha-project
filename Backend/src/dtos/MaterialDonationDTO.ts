export interface CreateMaterialDonationDTO {
    donorName: string;
    item: string;
    quantity: number;
    userId: string;
    images: string[];
  }
  
  export interface UpdateMaterialDonationStatusDTO {
    status: 'approved' | 'rejected';
    cancelReason?: string;
  }
  