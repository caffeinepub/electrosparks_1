import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RegistrationData {
  name: string;
  college: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  eventType: 'technical' | 'non-technical' | 'both';
  numberOfMembers: number;
  totalAmount: number;
}

interface RegistrationContextType {
  registration: RegistrationData | null;
  setRegistration: (data: RegistrationData) => void;
  clearRegistration: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registration, setRegistrationState] = useState<RegistrationData | null>(null);

  const setRegistration = (data: RegistrationData) => {
    setRegistrationState(data);
  };

  const clearRegistration = () => {
    setRegistrationState(null);
  };

  return (
    <RegistrationContext.Provider value={{ registration, setRegistration, clearRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error('useRegistration must be used within RegistrationProvider');
  return ctx;
}
