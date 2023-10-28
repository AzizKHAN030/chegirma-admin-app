import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IuseCustomerVerificationStore {
  isVerificationCodeSent: boolean;
  setIsVerificationCodeSent: (isSent: boolean) => void;
}

export const useCustomerVerificationStore =
  create<IuseCustomerVerificationStore>(set => ({
    isVerificationCodeSent: false,
    setIsVerificationCodeSent: (isSent: boolean) =>
      set({ isVerificationCodeSent: isSent }),
  }));
