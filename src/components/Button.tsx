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
}) => {
  return (
    <button
      className={`m-4 p-4 ${bgcolor} ${extraStyle} flex flex-row justify-center items-center`}
      onClick={onClick}
    >
      <Heading
        text={text}
        size={textSize}
        color={textColor}
        extraStyle='mx-2'
      />

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
