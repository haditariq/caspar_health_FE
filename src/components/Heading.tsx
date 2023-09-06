import { OptionalString } from '@/types/common';
import React, { FC } from 'react';

type HeadingProps = {
  text: string;
  size: OptionalString;
  color: OptionalString;
  extraStyle?: string;
};

const Heading: FC<HeadingProps> = ({ text, size, color, extraStyle }) => {
  return <p className={`${color} ${size} ${extraStyle}`}>{text}</p>;
};

export default Heading;
