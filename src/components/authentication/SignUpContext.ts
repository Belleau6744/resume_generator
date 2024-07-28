import { createContext } from 'react';

type SignupContextType = {
  passwordInput: string;
  confirmPasswordInput: string;
}

export const SignupContext = createContext<SignupContextType | undefined>(undefined);