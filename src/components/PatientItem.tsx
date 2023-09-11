import React, { FC } from 'react';
import Heading from './Heading';
import Image from 'next/image';
import Icons from '@/assets';
import Link from 'next/link';
import ImageContainer from './ImageContainer';

type PatientItemProps = {
  patient_id: number;
  firstName: string;
  lastName: string;
};

const PatientItem: FC<PatientItemProps> = ({
  patient_id,
  firstName,
  lastName,
}) => {
  return (
    <div className='p-4 flex-1 flex w-full items-center border-b-2 border-light_grey'>

      <div className=' flex-1'>
        <Heading
          text={`${patient_id}: ${firstName} ${lastName}`}
          extraStyle='font-semibold'
          size='text-md'
        />
      </div>

      <Link href={`/patients/details/${patient_id}`}>
        <ImageContainer
          src={Icons.link}
          height={20}
          width={20}
          extraStyle='object-contain mx-5'
          alt='Link'
        />
      </Link>
    </div>
  );
};

export default PatientItem;
