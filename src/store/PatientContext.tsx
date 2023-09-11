/* eslint-disable react-hooks/exhaustive-deps */
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
  sortAscending: undefined,
  query: '',
  gender: '',
  ageRange: '',
};

export interface PatientContextType {
  searchThroughPatients: (obj: SearchPatientProps) => void;
  fetchPatientById: (patient_id: number) => PatientProps;
  patients: PatientProps[] | [];
  patientsSize: number;
  queryParams: SearchPatientProps;
  setQueryParams: (obj: SearchPatientProps) => void;
  deletedPatients: number[];
  deletePatientById: (e: number) => void;
  resetSearchFilters: () => void;
  hasFilter: boolean;
  query: string;
  setQuery: (e: string) => void;
}

export interface SearchPatientProps {
  query?: string;
  gender?: string;
  ageRange?: string;
  sortAscending?: SortingOptions;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const PatientContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hasFilter, setHasFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [patients, setPatients] = useState<PatientProps[] | []>([]);
  const [deletedPatients, setDeletedPatients] = useState<number[] | []>([]);
  const [queryParams, setQueryParams] =
    useState<SearchPatientProps>(initialStateQuery);

  useEffect(() => {
    setPatients(PatientList as PatientProps[]);
  }, []);

  useEffect(() => {
    searchThroughPatients();
    currentParamState();
  }, [queryParams, query]);

  const fetchPatientById = (patient_id: number) => {
    return PatientById(PatientList as PatientProps[], patient_id);
  };

  const deletePatientById = (e: number) => {
    setDeletedPatients((prevDeletedPatient) => {
      return [...prevDeletedPatient, e];
    });
  };

  // search 'query' debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchThroughPatients();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const searchThroughPatients = () => {
    const { sortAscending, gender, ageRange } = queryParams;
    console.log(sortAscending, query, gender, ageRange);
    const response = PatientSearchAlgo({
      patients: PatientList as PatientProps[],
      sortAscending,
      query,
      gender,
      ageRange,
    });
    setPatients([...response]);
  };

  // reset all seach filters
  const resetSearchFilters = () => {
    setQueryParams(initialStateQuery);
    setQuery("")
  };

  // reset state
  const currentParamState = () => {
    const { sortAscending, gender, ageRange } = queryParams;
    const decision =
      query?.length == 0 &&
      sortAscending == undefined &&
      !gender?.length &&
      !ageRange?.length;
    setHasFilter(decision);
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
    resetSearchFilters,
    hasFilter,
    query,
    setQuery,
  };

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};

export default PatientContextProvider;

// Custom hook to use the context
export const usePatientContext = () => {
  const ctx = useContext(PatientContext);
  if (!ctx) {
    throw new Error('Something wrnt wring');
  }
  return ctx;
};
