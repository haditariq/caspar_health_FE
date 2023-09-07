import React, { FC } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import Heading from './Heading';
import Spinner from './Spinner';

type loadSizeProps = string | undefined;

type ButtonProps = {
  text: string;
  textSize: string;
  textColor: string;
  onClick: () => void;
  extraStyle?: string;
  bgcolor: string;
  loading?: boolean;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  text,
  textSize,
  textColor,
  onClick,
  extraStyle,
  bgcolor,
  loading,
  disabled,
}) => {
  return (
    <button
      className={`${bgcolor} ${extraStyle} flex flex-row justify-center items-center ${
        disabled && ' bg-black cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <Heading text={text} size={textSize} color={textColor} />

      {loading && <Spinner bg='text-white' spinnerColor='fill-primary' />}
    </button>
  );
};

export default Button;
