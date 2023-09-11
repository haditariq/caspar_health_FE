'use client';
import Button from '@/components/Button';
import DeletePatientModalContent from '@/components/DeletePatientModalContent';
import Header from '@/components/Header';
import Heading from '@/components/Heading';
import ImageContainer from '@/components/ImageContainer';
import ModalPopup from '@/components/ModalPopup';
import { usePatientContext } from '@/store/PatientContext';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';

const Page: FC<any> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);

  const fetchById = usePatientContext()?.fetchPatientById(id);
  const queryParams = usePatientContext()?.queryParams;
  const deletePatientById = usePatientContext()?.deletePatientById;

  const deletePatient = () => {
    setLoading(!loading);
    setTimeout(() => {
      if (deletePatientById) deletePatientById(parseInt(id));
      setLoading(false);
      setDeleteModalShow(false);
      router.back();
    }, 2000);
  };

  return (
    <div className='w-full'>
      <Header title={`Patient ID: ${id}`} canGoBack={() => router.back()} />
      <div className='flex flex-row p-4'>
        <div className='flex flex-1'>
          <ImageContainer
            src={fetchById?.avatar as string}
            height={80}
            width={80}
            extraStyle='object-fill h-20 w-20 rounded-full mx-5'
            alt='Link'
          />
          <div className='flex flex-1 flex-col flex-row'>
            <div>
              <Heading text={`${queryParams?.query}`} size='md' />
            </div>

            <div className='flex flex-row'>
              <Heading text='Patient ID: ' size='md' extraStyle='mr-1' />
              <Heading text={`${fetchById?.patient_id}`} size='md' />
            </div>

            <div className='flex flex-row'>
              <Heading text='First Name: ' size='md' extraStyle='mr-1' />
              <Heading text={`${fetchById?.first_name}`} size='md' />
            </div>

            <div className='flex flex-row'>
              <Heading text='Last Name: ' size='md' extraStyle='mr-1' />
              <Heading text={`${fetchById?.last_name}`} size='md' />
            </div>

            <div className='flex flex-row'>
              <Heading text='Age: ' size='md' extraStyle='mr-1' />
              <Heading text={`${fetchById?.age}`} size='md' />
            </div>

            <div className='flex flex-row'>
              <Heading text='Email: ' size='md' extraStyle='mr-1' />
              <Heading text={`${fetchById?.email}`} size='md' />
            </div>
          </div>
        </div>

        <Button
          text={`Delete Patient: ${id}`}
          onClick={() => setDeleteModalShow(true)}
          textColor='text-white'
          textSize='md'
          bgcolor='bg-secondry'
          extraStyle='p-3 rounded-md hover:bg-warning h-12'
          loading={false}
        />
      </div>
      {deleteModalShow && (
        <ModalPopup containerStyle='w-2/6 m-auto left-0 right-0'>
          <DeletePatientModalContent
            title={`Are you sure you want to delete ${fetchById?.patient_id}`}
            option1={'Delete'}
            option2={'Cancel'}
            onClickOption1={deletePatient}
            onClickOption2={() => setDeleteModalShow(false)}
            loading1={loading}
            loading2={false}
          />
        </ModalPopup>
      )}
    </div>
  );
};

export default Page;
