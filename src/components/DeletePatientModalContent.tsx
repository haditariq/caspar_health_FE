import React, { FC } from 'react';
import Heading from './Heading';
import Button from './Button';

type DeletePatientModalContentProps = {
  title: string;
  option1: string;
  option2: string;
  onClickOption1: () => void;
  onClickOption2: () => void;
  loading1: boolean;
  loading2: boolean;
};
const DeletePatientModalContent: FC<DeletePatientModalContentProps> = ({
  title,
  option1,
  option2,
  onClickOption1,
  onClickOption2,
  loading1,
  loading2,
}) => {
  return (
    <div className='border-2 border-light_border rounded-md'>
      <button
        type='button'
        className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
        data-modal-hide='popup-modal'
      >
        <svg
          className='w-3 h-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 14'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
          />
        </svg>
        <span className='sr-only'>Close modal</span>
      </button>
      <div className='p-6 text-center'>
        <svg
          className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
        <Heading
          text={title}
          size='md'
          extraStyle='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'
        />
        <div className='flex justify-evenly'>
          <Button
            text={option1}
            textColor='text-white'
            onClick={onClickOption1}
            bgcolor='bg-secondry'
            textSize='text-md'
            extraStyle='px-2 py-2 w-1/4 rounded-md'
            loading={loading1}
          />
          <Button
            text={option2}
            textColor='text-black'
            onClick={onClickOption2}
            bgcolor='bg-white'
            textSize='text-md'
            extraStyle='px-2 py-2 w-1/4 rounded-md border-2 border-light_border'
            loading={loading2}
          />
        </div>
      </div>
    </div>
  );
};

export default DeletePatientModalContent;
