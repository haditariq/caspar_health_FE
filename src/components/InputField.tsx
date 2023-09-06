import Icons from '@/assets';
import Image from 'next/image';
import React, { ChangeEvent, FC } from 'react';
import Button from './Button';

type InputFieldProps = {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  extraStyle: string;
};

const InputField: FC<InputFieldProps> = ({
  placeholder,
  onChange,
  extraStyle,
}) => {
  return (
    <div className={`${extraStyle} flex flex-row h-10 items-center px-2`}>
      <Image
        src={Icons.search}
        alt='search'
        height={18}
        width={18}
        className='fill-slate-100 mr-2'
      />
      <input
        className={`p-1.5 outline-none w-full`}
        placeholder={placeholder}
        onChange={onChange}
        name='chamalako'
      />
      <Button
        text='Go'
        textSize='text-lg'
        loading={false}
        extraStyle='bg-primary px-5 py-5 m-0 h-full rounded-r-md -mr-3'
        textColor='text-white'
        onClick={() => alert('Search Results')}
        bgcolor='bg-primary'
      />
    </div>
  );
};

export default InputField;
