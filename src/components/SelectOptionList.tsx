import React, { useId, FC, ChangeEvent } from 'react';
import { OptionalString } from '@/types/common';

type SelectOptionListProps = {
  list: string[];
  heading: string;
  onSelectOption: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

const SelectOptionList: FC<SelectOptionListProps> = ({
  list,
  heading,
  onSelectOption,
  value,
}) => {
  const itemid = useId();
  return (
    <div className='mx-2 w-2/4'>
      <select
        id='countries'
        className='w-full block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-light_grey outline-none peer'
        onChange={(e) => onSelectOption(e)}
        value={value}
      >
        <option >Choose a {heading}</option>
        {list.map((item: string, idx: number) => {
          const key = itemid + idx;
          return (
            <option key={key} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectOptionList;
