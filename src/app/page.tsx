'use client';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const onClickToPatientFeed = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      push('/patients/feed');
    }, 2000);
  };

  return (
    <main className='flex flex-1 flex-col min-h-screen items-center justify-center bg-secondry text-white '>
      <Heading
        text='Please click to proceed to Caspar health Patients Feed.'
        size='text-xl'
        color='text-white'
      />
      <Button
        text='Patients Feed'
        onClick={onClickToPatientFeed}
        bgcolor='bg-primary'
        extraStyle='rounded-md w-72 item-center justify-center py-4 mt-5'
        loading={loading}
        loaderSize={'20'}
        loaderColor={'#fff'}
        textColor='text-white'
        textSize='text-xl'
      />
    </main>
  );
}
