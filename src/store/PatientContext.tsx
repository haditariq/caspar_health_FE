'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import PatientList from '@/data/mock_data.json';
import { PatientProps } from '@/types/Patient';

export interface PatientContextType {
  deletePatient: (e: number) => void;
  searchThroughPatients: (obj: any) => void;
  patients: PatientProps[];
}

type SearchPatientProps = {
  query?: string;
  gender?: string;
  ageRange?: string;
  sortAscending?: boolean;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const PatientContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [patients, setPatients] = useState<PatientProps[] | []>([]);

  useEffect(() => {
    setPatients(PatientList as PatientProps[]);
  }, []);

  const deletePatient = (idx: number) => {
    console.log(patients, idx);
  };

  const searchThroughPatients = ({
    query,
    gender,
    ageRange,
    sortAscending,
  }: SearchPatientProps) => {
    console.log('searchThroughPatients actions!!!!!', {
      query,
      gender,
      ageRange,
      sortAscending,
    });
    // setPatients([...patients.slice(0, 200)]);
  };

  const value: PatientContextType = {
    deletePatient,
    searchThroughPatients,
    patients,
  };

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};

export default PatientContextProvider;

// Custom hook to use the context
export const usePatientContext = () => {
  return useContext(PatientContext);
};
