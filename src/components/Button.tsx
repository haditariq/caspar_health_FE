import React, { FC } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import Heading from './Heading';

type loadSizeProps = string | undefined;

type ButtonProps = {
  text: string;
  textSize: string;
  textColor: string;
  onClick: () => void;
  extraStyle?: string;
  bgcolor: string;
  loading?: boolean;
  loaderSize?: loadSizeProps;
  loaderColor?: string;
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
  loaderSize,
  loaderColor,
  disabled,
}) => {
  return (
    <button
      className={`${bgcolor} ${extraStyle} flex flex-row justify-center items-center ${
        disabled && 'opacity-60 bg-black cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <Heading text={text} size={textSize} color={textColor} />

      <RotatingLines
        strokeColor={loaderColor}
        strokeWidth='5'
        animationDuration='0.75'
        width={loaderSize}
        visible={loading}
      />
    </button>
  );
};

export default Button;
