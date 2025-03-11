import { faCaretDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

// Add a callback prop to notify parent about the selected sorting option
const SelectGroupOrderBy: React.FC<{ Title: string, onSortChange: (sortValue: string) => void }> = ({ Title, onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="flex items-center justify-around">
      <span className="text-sm pl-4 pr-4 block text-primary">
        <FontAwesomeIcon icon={faFilter} />
      </span>

      <div className="relative z-20 bg-transparent">
        <select
          value={selectedOption}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedOption(value);
            changeTextColor();
            onSortChange(value); // Notify parent of the selected option
          }}
          className={`text-center text-sm relative z-20 w-50 appearance-none rounded border border-primary border-[1px] bg-transparent py-1 px-3 outline-none transition focus:active:border-secondary active:active:border-secondary xs:w-50 sm:w-50 lg:w-50 ${
            isOptionSelected ? 'text-secondary' : ''
          }`}
        >
          <option value="" disabled className="text-body">
            
          </option>
          <option value="ASC" className="text-body text-left">
            Title Ascending
          </option>
          <option value="DESC" className="text-body text-left">
            Title Descending
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 text-[#17C0CC]">
          <FontAwesomeIcon className="ml-4" icon={faCaretDown} />
        </span>
      </div>
    </div>
  );
};

export default SelectGroupOrderBy;
