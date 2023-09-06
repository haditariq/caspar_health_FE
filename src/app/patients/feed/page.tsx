'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import React, { useState } from 'react';

const Page = () => {
  const [showAdvanceSearch, setShowAdvanceSearch] = useState<boolean>(false);
  return (
    <div className='flex flex-1 flex-col'>
      <Header
        title='Patients Feed'
        canGoBack={() => alert('hallo')}
        textColor='text-white'
        textSize={'text-xl'}
      />
      <div className='flex justify-center items-center flex-col self-center w-2/4'>
        <InputField
          placeholder={'Quick search...'}
          onChange={() => {}}
          extraStyle={'border-2 border-light_border rounded-md w-full mb-0.5'}
        />
        <Button
          loading={false}
          text='Advance Filters'
          extraStyle='px-px m-0 self-end'
          textSize='text-sm'
          textColor='text-primary'
          onClick={() => {}}
          bgcolor='bg-white'
        />
      </div>
    </div>
  );
};

export default Page;
