'use client';
import AdvanceSearch from '@/components/AdvanceSearch';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import { OptionalString, SortingOptions } from '@/types/common';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [sortAscending, setSortAscending] = useState<SortingOptions>(undefined);
  const [query, setQuery] = useState<string>('');
  const [isResetable, setIsResetable] = useState<boolean>(false);
  const [gender, setGender] = useState<string>('');
  const [ageRange, setAgeRange] = useState<string>('');

  const onChangeSort = (status: SortingOptions) => {
    setSortAscending(status);
  };

  useEffect(() => {
    resetState();
  }, [query]);

  const resetState = () => {
    console.log('jhello');
    const decision = query.length == 0;
    setIsResetable(decision);
  };

  const resetSearch = () => {
    setQuery('');
    setGender('');
    setAgeRange('');
    setSortAscending(undefined)
  };
  return (
    <div className='flex flex-1 flex-col'>
      <Header
        title='Patients Feed'
        textColor='text-white'
        textSize={'text-xl'}
      />
      <div className='flex justify-center items-center flex-col self-center w-2/4 mt-2'>
        <InputField
          placeholder={'Quick search...'}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          extraStyle={`border-2 border-light_border rounded-md w-full mb-0.5 `}
        >
          <div className='flex items-center'>
            <Button
              text='Search'
              textSize='text-lg'
              loading={false}
              extraStyle='bg-primary px-4 py-2 m-0 h-full'
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
              extraStyle='bg-secondry px-4 py-2 m-0 h-full -mr-3 rounded-r-md'
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
      </div>
    </div>
  );
};

export default Page;
