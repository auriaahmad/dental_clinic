import React, { useEffect, useRef, useState } from 'react';
import CInput from '../form/CInput';
import { useTranslation } from 'react-i18next';
import search from '../../assets/searchRegular.svg';
import useClickAway from '../../hooks/useClickaway';

const SearchableDropDown = ({
  searchKeyword,
  setSearchKeyword,
  onChange,
  filteredData,
  selectedItem,
  setSelectedItem,
  label,
  placeholder,
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { t } = useTranslation();
  const optionsRef = useRef();

  useClickAway(optionsRef, () => {
    setOptionsOpen(false);
  });

  useEffect(() => {
    if (searchKeyword?.length > 0) setOptionsOpen(true);
    else setOptionsOpen(false);
  }, [searchKeyword]);
  console.log(filteredData);
  return (
    <div className='w-full relative'>
      <CInput
        label={label}
        placeholder={placeholder}
        style={{ width: '100%' }}
        icon={search}
        value={
          selectedItem?.name ||
          selectedItem?.product ||
          selectedItem?.planningNumber ||
          searchKeyword
        }
        // onChange={event => {
        //   setSelectedUser();
        //   setSearchKeyword(event.target.value);
        // }}

        onChange={onChange}
      />

      {searchKeyword.length > 0 && (
        <div className='w-full relative' ref={optionsRef}>
          <div className='absolute top-0 w-full z-50 rounded-lg bg-white'>
            {filteredData.map(item => (
              <div
                className='w-full p-2 cursor-pointer'
                onClick={() => {
                  setSelectedItem(item);
                  setSearchKeyword('');
                }}
              >
                {item.name || item.planningNumber || item.product}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropDown;
