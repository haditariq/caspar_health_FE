/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AdvanceSearch from '@/components/AdvanceSearch';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import { OptionalString, SortingOptions } from '@/types/common';
import React, { useEffect, useId, useMemo, useState } from 'react';
import PatientItem from '@/components/PatientItem';
import Heading from '@/components/Heading';
import {
  SearchQueryParamsType,
  initialStateQuery,
  usePatientContext,
} from '@/store/PatientContext';
import { PatientProps } from '@/types/Patient';

const Page = () => {
  const patientid = useId();
  const queryParams = usePatientContext()?.queryParams;
  const [sortAscending, setSortAscending] = useState<SortingOptions>(
    queryParams?.sortOrder
  );
  const [query, setQuery] = useState<OptionalString>(queryParams?.query);
  const [gender, setGender] = useState<OptionalString>(queryParams?.gender);
  const [ageRange, setAgeRange] = useState<OptionalString>(
    queryParams?.ageRange
  );

  // context properties
  const patients = usePatientContext()?.patients;
  const searchThroughPatients = usePatientContext()?.searchThroughPatients;
  const patientsSize = usePatientContext()?.patientsSize;
  const setQueryParams = usePatientContext()?.setQueryParams;
  const deletedPatients = usePatientContext()?.deletedPatients;

  // reset state
  const resetState = useMemo(() => {
    const decision =
      query?.length == 0 &&
      sortAscending == undefined &&
      !gender?.length &&
      !ageRange?.length;
    return decision;
  }, [query, ageRange, gender, sortAscending]);

  // reset all seach filters
  const resetSearchFilters = () => {
    setQuery('');
    setGender('');
    setAgeRange('');
    setSortAscending(undefined);
    if (setQueryParams) setQueryParams(initialStateQuery);
  };

  // search 'query' debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (setQueryParams) {
        const q = {
          ...queryParams,
          query: query,
        };
        setQueryParams(q as SearchQueryParamsType);
      }
      searchPatients();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // when 'ageRange, gender, sortAscending' effects
  useEffect(() => {
    searchPatients();
    if (setQueryParams) {
      const q = {
        query: query,
        ageRange,
        gender,
        sortOrder: sortAscending,
      };
      setQueryParams(q as SearchQueryParamsType);
    }
  }, [ageRange, gender, sortAscending]);

  // call filter api
  const searchPatients = () => {
    if (searchThroughPatients)
      searchThroughPatients({ query, gender, ageRange, sortAscending });
  };

  return (
    <div className='flex flex-1 flex-col bg-white'>
      <Header
        title='Patients Feed'
        textColor='text-black'
        textSize={'text-xl'}
      />

      <div className='flex justify-center items-center flex-col self-center w-2/4'>
        <InputField
          placeholder={'Quick search...'}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          extraStyle={`border-2 border-light_border rounded-md w-full mb-0.5 text-sm`}
        >
          <div className='flex items-center'>
            <Button
              text='Reset'
              textSize='text-lg'
              loading={false}
              textColor='text-white'
              onClick={resetSearchFilters}
              bgcolor='bg-primary'
              extraStyle='bg-secondry px-4 py-2.5 m-0 h-full -mr-3 rounded-r-md'
              disabled={resetState}
            />
          </div>
        </InputField>

        <AdvanceSearch
          sortAscending={sortAscending}
          onClickSort={(status: SortingOptions) => setSortAscending(status)}
          onSetAgeRange={(e: string) => setAgeRange(e)}
          onSetGender={(e: string) => setGender(e)}
          gender={gender as string}
          ageRange={ageRange as string}
        />

        <div className='flex w-full flex-1 items-end justify-end my-1'>
          <Heading
            text={`Results found`}
            size='text-sm'
            color='light_border'
            extraStyle='mx-1'
          />
          <Heading
            text={`${patients?.length}`}
            size='text-sm'
            color='light_border'
            extraStyle='font-medium'
          />
          <Heading
            text={`of`}
            size='text-sm'
            color='light_border'
            extraStyle='mx-1'
          />
          <Heading
            text={`${patientsSize}`}
            size='text-sm'
            color='light_border'
            extraStyle='font-medium'
          />
        </div>
      </div>

      <div className='flex-1 mt-3 p-2 bg-white'>
        {patients?.map((item: PatientProps, idx: number) => {
          const id = patientid + idx;
          const {
            first_name,
            last_name,
            email,
            gender,
            age,
            avatar,
            patient_id,
          } = item;
          if (deletedPatients?.indexOf(patient_id) != -1) return null;
          return (
            <PatientItem
              key={id}
              firstName={first_name}
              lastName={last_name}
              email={email}
              gender={gender}
              age={age}
              avatar={avatar}
              patient_id={patient_id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
