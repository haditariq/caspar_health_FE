/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Header from '@/components/Header';
import { usePatientContext } from '@/store/PatientContext';
import { useRouter } from 'next/navigation';
import React, { FC, useMemo } from 'react';

const Page: FC<any> = ({ params }) => {
  const { slug } = params;
  const router = useRouter();
  const deletePatient = usePatientContext()?.deletePatient;
  const fetchById = useMemo(
    () => usePatientContext()?.fetchPatientById(slug),
    [slug]
  );

  console.log(fetchById);

  const { patient_id, first_name, last_name, email, age, avatar } =
    fetchById[0];
  return (
    <div className='w-full'>
      <Header title={`Patient ID: ${slug}`} canGoBack={() => router.back()} />
      {patient_id}
      {first_name}
      {last_name}
      {age}
      {email}
      {avatar}
    </div>
  );
};

export default Page;
