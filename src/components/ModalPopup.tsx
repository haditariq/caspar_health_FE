import React, { FC, ReactNode } from 'react';

type ModalProps = {
  containerStyle?: string;
  contentStyle?: string;
  children: ReactNode;
};

const ModalPopup: FC<ModalProps> = ({
  containerStyle,
  contentStyle,
  children,
}) => {
  return (
    <div className={`absolute ${containerStyle}`}>
      <div className={`relative ${contentStyle}`}>{children}</div>
    </div>
  );
};

export default ModalPopup;
