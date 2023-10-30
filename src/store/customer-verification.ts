import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface useCustomerVerificationStore {
  isVerificationCodeSent: boolean;
  phoneNumber: string;
  setIsVerificationCodeSent: (isSent: boolean) => void;
  setPhoneNumber: (phoneNumber: string) => void;
}

export const useCustomerVerification = create<useCustomerVerificationStore>()(
  devtools(set => ({
    isVerificationCodeSent: false,
    phoneNumber: '',
    setIsVerificationCodeSent: (isSent: boolean) =>
      set({ isVerificationCodeSent: isSent }),
    setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
  }))
);
