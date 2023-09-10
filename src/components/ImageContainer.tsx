import Image from 'next/image';
import React from 'react';

type ImageProps = {
  src: string;
  height?: number;
  width?: number;
  extraStyle: string;
  alt: string;
};

const ImageContainer = ({
  src,
  height,
  width,
  extraStyle,
  alt,
}: ImageProps) => {
  return (
    <Image
      src={src}
      height={height}
      width={width}
      className={extraStyle}
      alt={alt}
    />
  );
};

export default ImageContainer;
