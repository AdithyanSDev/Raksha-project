export interface CreateMonetaryDonationDTO {
    userId: string;
    donorName: string;
    donationType: 'one-time' | 'monthly';
    paymentMethod: 'credit_card' | 'upi' | 'razorpay';
    amount: number;
    coverFees: number;
  }
  
  export interface UpdateMonetaryDonationStatusDTO {
    status: 'completed' | 'failed';
    razorpayOrderId?: string;
  }
  