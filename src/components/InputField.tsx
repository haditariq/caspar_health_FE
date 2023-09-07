import Icons from '@/assets';
import Image from 'next/image';
import React, { ChangeEvent, FC, ReactNode } from 'react';

type InputFieldProps = {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  extraStyle: string;
  children: ReactNode;
  value?: string;
};

const InputField: FC<InputFieldProps> = ({
  placeholder,
  onChange,
  extraStyle,
  children,
  value,
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
        className={`outline-none w-full`}
        placeholder={placeholder}
        onChange={onChange}
        name='chamalako'
        value={value}
      />
      {children}
    </div>
  );
};

export default InputField;
