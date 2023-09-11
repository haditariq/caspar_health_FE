import React, { FC } from 'react';
import SelectOptionList from './SelectOptionList';
import AdvanceSearchLists from '../data/advanceSearchlists.json';
import Image from 'next/image';
import Icons from '@/assets';
import { SortingOptions } from '@/types/common';

type AdvanceSearchProps = {
  sortAscending: SortingOptions;
  onClickSort: (e: SortingOptions) => void;
  onSetAgeRange: (e: string) => void;
  onSetGender: (e: string) => void;
  gender: string;
  ageRange: string;
};

const AdvanceSearch: FC<AdvanceSearchProps> = ({
  sortAscending,
  onClickSort,
  onSetAgeRange,
  onSetGender,
  gender,
  ageRange,
}) => {
  return (
    <div className='w-full bg-white rounded-md'>
      <div className='flex w-full mt-3'>
        <SelectOptionList
          list={AdvanceSearchLists.genders}
          heading={'Gender'}
          onSelectOption={(e) => onSetGender(e.target.value)}
          value={gender}
        />
        <SelectOptionList
          list={AdvanceSearchLists.ages}
          heading={'Age'}
          onSelectOption={(e) => onSetAgeRange(e.target.value)}
          value={ageRange}
        />
        <div className='flex relative'>
          {sortAscending !== undefined && (
            <div className='absolute -top-2 -right-2'>
              <button onClick={() => onClickSort(undefined)}>
                <Image src={Icons.cross} alt='cross' height={18} width={18} />
              </button>
            </div>
          )}
          <button
            className={`w-28 flex items-center justify-center rounded-md border-2 border-light_grey ${
              sortAscending == 'asc' && 'border-primary'
            }
            ${sortAscending == 'dec' && 'border-primary'}
          }
          `}
            onClick={
              sortAscending == 'dec'
                ? () => onClickSort('asc')
                : () => onClickSort('dec')
            }
          >
            <Image
              src={sortAscending == 'asc' ? Icons.accending : Icons.decending}
              alt='sortIcon'
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearch;
