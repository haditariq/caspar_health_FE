import React, { FC } from 'react';
import Heading from './Heading';
import Image from 'next/image';

type PatientItemProps = {
  patient_id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  avatar: string;
};

const PatientItem: FC<PatientItemProps> = ({
  patient_id,
  firstName,
  lastName,
  email,
  gender,
  age,
  avatar,
}) => {
  return (
    <div className='p-4 flex-1 flex w-full border-b-2 border-light_border'>
      <Image
        height={20}
        width={20}
        src={avatar}
        alt='avatar'
        className='object-fill h-20 w-20 rounded-full mx-5'
      />

      <div>
        <Heading
          text={`${patient_id}: ${firstName} ${lastName}`}
          extraStyle='font-semibold'
          size='text-md'
        />
        <Heading text={`Email: ${email}`} size='text-sm' />
        <Heading text={`Gender: ${gender}`} size='text-sm' />
        <Heading text={`Age: ${age}`} size='text-sm' />
      </div>
    </div>
  );
};

export default PatientItem;
