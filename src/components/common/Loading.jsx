import React from 'react';
import { twMerge } from 'tailwind-merge';

const Loading = ({ isSmall }) => {
  return (
    <div
      className='w-full h-full fixed left-0 top-0 bottom-0  bg-[#F3F4F5] flex justify-center items-center '
      style={{ zIndex: 50 }}
    >
      <span className='loader'></span>
    </div>
  );
};

export default Loading;
