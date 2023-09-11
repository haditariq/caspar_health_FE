'use client';
import AdvanceSearch from '@/components/AdvanceSearch';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import { SortingOptions } from '@/types/common';
import React, { useEffect, useId } from 'react';
import PatientItem from '@/components/PatientItem';
import Heading from '@/components/Heading';
import { SearchPatientProps, usePatientContext } from '@/store/PatientContext';
import { PatientProps } from '@/types/Patient';

const Page = () => {
  const patientid = useId();

  // context properties
  const {
    patients,
    patientsSize,
    setQueryParams,
    deletedPatients,
    resetSearchFilters,
    queryParams,
    hasFilter,
    query,
    setQuery,
  } = usePatientContext();

  const { sortAscending, gender, ageRange } = queryParams;

  const searchQueryParams = (obj: SearchPatientProps): void => {
    const q = {
      ageRange,
      gender,
      sortOrder: sortAscending,
      ...obj,
    };
    setQueryParams(q);
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
          extraStyle={`border-2 border-light_grey rounded-md w-full mb-0.5 text-sm`}
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
              disabled={hasFilter}
            />
          </div>
        </InputField>

        <AdvanceSearch
          sortAscending={sortAscending}
          onClickSort={(status: SortingOptions) =>
            searchQueryParams({ sortAscending: status })
          }
          onSetAgeRange={(e: string) => searchQueryParams({ ageRange: e })}
          onSetGender={(e: string) => searchQueryParams({ gender: e })}
          gender={gender as string}
          ageRange={ageRange as string}
        />

        <div className='flex w-full flex-1 items-end justify-end my-1'>
          <Heading text={`Results found`} size='text-sm' extraStyle='mx-1' />
          <Heading
            text={`${patients?.length}`}
            size='text-sm'
            extraStyle='font-medium'
          />
          <Heading text={`of`} size='text-sm' extraStyle='mx-1' />
          <Heading
            text={`${patientsSize}`}
            size='text-sm'
            extraStyle='font-medium'
          />
        </div>
      </div>

      <div className='flex-1 mt-3 p-2 bg-white'>
        {patients?.map((item: PatientProps, idx: number) => {
          const id = patientid + idx;
          const { first_name, last_name, patient_id } = item;
          if (deletedPatients?.indexOf(patient_id) != -1) return null;
          return (
            <PatientItem
              key={id}
              firstName={first_name}
              lastName={last_name}
              patient_id={patient_id}
            />
          );
        })}
        {patients?.length == 0 && (
          <div className='flex items-center justify-center mt-10'>
            <Heading text='No results found.' color='text-black' size='lg' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
