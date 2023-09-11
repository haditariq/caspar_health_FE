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
import PatientSearchAlgo, { PatientById } from '@/utils/patientSearching';
import { SortingOptions } from '@/types/common';

export const initialStateQuery = {
  sortOrder: undefined,
  query: '',
  gender: '',
  ageRange: '',
}

export interface PatientContextType {
  searchThroughPatients: (obj: SearchPatientProps) => void;
  fetchPatientById: (patient_id: number) => PatientProps;
  patients: PatientProps[] | [];
  patientsSize: number;
  queryParams: SearchQueryParamsType;
  setQueryParams: (obj: SearchQueryParamsType) => void;
  deletedPatients: number[];
  deletePatientById: (e: number) => void;
}

export interface SearchPatientProps {
  query?: string;
  gender?: string;
  ageRange?: string;
  sortAscending?: 'asc' | 'dec' | undefined;
}

export type SearchQueryParamsType = {
  sortOrder: SortingOptions;
  query: string;
  gender: string;
  ageRange: string;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const PatientContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [patients, setPatients] = useState<PatientProps[] | []>([]);
  const [deletedPatients, setDeletedPatients] = useState<number[] | []>([]);
  const [queryParams, setQueryParams] = useState<SearchQueryParamsType>(initialStateQuery);

  useEffect(() => {
    setPatients(PatientList as PatientProps[]);
  }, []);

  const fetchPatientById = (patient_id: number) => {
    return PatientById(PatientList as PatientProps[], patient_id);
  };

  const deletePatientById = (e: number) => {
    const list = [...deletedPatients];
    setDeletedPatients([...list, e]);
  };

  const searchThroughPatients = ({
    query,
    gender,
    ageRange,
    sortAscending,
  }: SearchPatientProps) => {
    const response = PatientSearchAlgo({
      patients: PatientList as PatientProps[],
      query,
      gender,
      ageRange,
      sortAscending,
    });
    setPatients([...response]);
  };

  const value: PatientContextType = {
    searchThroughPatients,
    patients,
    patientsSize: PatientList.length,
    fetchPatientById,
    queryParams,
    setQueryParams,
    deletedPatients,
    deletePatientById,
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
