export interface ResourceRequestDTO {
    userId: string;
    resourceType: string;
    quantity: number;
    description: string;
    location: string;
    address: string;
    contactInfo: string;
    urgencyLevel: string;
    disasterType: string;
    numberOfPeopleAffected: number;
    additionalInfo?: string;
    documents?: string[];
    rejectionReason?: { type: String },

  }
  