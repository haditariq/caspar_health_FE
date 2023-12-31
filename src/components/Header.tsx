import React, { FC } from 'react';
import Image from 'next/image';
import Icons from '../assets';
import Heading from './Heading';
import { OptionalString } from '@/types/common';

type HeaderProps = {
  title: string;
  canGoBack?: () => void;
  textSize?: OptionalString;
  textColor?: OptionalString;
};

const Header: FC<HeaderProps> = ({ title, canGoBack, textColor, textSize }) => {
  return (
    <div className='flex flex-row h-16 items-center p-2 px-6 mb-4 border-b-2 border-light_grey'>
      {canGoBack && (
        <button onClick={canGoBack}>
          <Image src={Icons.goBack} alt='backArrow' height={40} width={40} />
        </button>
      )}
      <Heading
        text={title}
        size={textSize}
        color={textColor}
        extraStyle='flex flex-1 justify-center items-center'
      />
    </div>
  );
};

export default Header;
