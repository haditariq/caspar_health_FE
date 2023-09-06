'use client';
import AdvanceSearch from '@/components/AdvanceSearch';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import { SortingOptions } from '@/types/common';
import React, { useEffect, useId, useState } from 'react';
import PatientList from '@/data/mock_data.json';
import PatientItem from '@/components/PatientItem';
import Heading from '@/components/Heading';

const Page = () => {
  const [sortAscending, setSortAscending] = useState<SortingOptions>(undefined);
  const [query, setQuery] = useState<string>('');
  const [isResetable, setIsResetable] = useState<boolean>(false);
  const [gender, setGender] = useState<string>('');
  const [ageRange, setAgeRange] = useState<string>('');

  const patientid = useId();

  const onChangeSort = (status: SortingOptions) => {
    setSortAscending(status);
  };

  useEffect(() => {
    resetState();
  }, [query, ageRange, gender, sortAscending]);

  const resetState = () => {
    const decision =
      query.length == 0 &&
      sortAscending == undefined &&
      !gender.length &&
      !ageRange.length;
    setIsResetable(decision);
  };

  const resetSearch = () => {
    setQuery('');
    setGender('');
    setAgeRange('');
    setSortAscending(undefined);
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
              text='Search'
              textSize='text-lg'
              loading={false}
              extraStyle='bg-primary px-4 py-2.5 m-0 h-full'
              textColor='text-white'
              onClick={() => alert('Search Results')}
              bgcolor='bg-primary'
            />
            <Button
              text='Reset'
              textSize='text-lg'
              loading={false}
              textColor='text-white'
              onClick={resetSearch}
              bgcolor='bg-primary'
              extraStyle='bg-secondry px-4 py-2.5 m-0 h-full -mr-3 rounded-r-md'
              disabled={isResetable}
            />
          </div>
        </InputField>

        <AdvanceSearch
          sortAscending={sortAscending}
          onClickSort={(status: SortingOptions) => onChangeSort(status)}
          onSetAgeRange={(e: string) => setAgeRange(e)}
          onSetGender={(e: string) => setGender(e)}
          gender={gender}
          ageRange={ageRange}
        />
        {(PatientList.length != PatientList.length) && (
          <div className='flex w-full flex-1 items-end justify-end my-1'>
            <Heading
              text={`Results found`}
              size='text-sm'
              color='light_border'
              extraStyle='mx-1'
            />
            <Heading
              text={`${PatientList.length}`}
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
              text={` ${PatientList.length}`}
              size='text-sm'
              color='light_border'
              extraStyle='font-medium'
            />
          </div>
        )}
      </div>

      <div className='mt-3 p-2 flex-1  bg-white'>
        {PatientList.map((item, idx) => {
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
