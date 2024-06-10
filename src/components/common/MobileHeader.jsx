import React from 'react';
import hamBurger from '../../assets/hamBurger.svg';

const MobileHeader = ({ setShowSideBar }) => {
  return (
    <div className='mainLayout__mobileSidebar'>
      <img src={hamBurger} alt='' onClick={() => setShowSideBar(true)} />

      <div className='flex flex-col text-center'>
        <div
          className='text-[1.25rem]'
          style={{ fontFamily: 'Times New Roman' }}
        >
          <span
            className='text-[#12083A]'
            style={{ fontFamily: 'Times New Roman' }}
          >
            Plani
          </span>
          <span
            className='text-[#FF0000]'
            style={{ fontFamily: 'Times New Roman' }}
          >
            Link
          </span>
        </div>
        <span
          style={{
            fontFamily: 'Times New Roman',
            fontSize: '0.5rem',
            marginTop: '-0.25rem',
            color: '#00B0F0',
          }}
        >
          4Dental Technology
        </span>
      </div>

      {/* <img src={blueLogo} alt='' className='w-[5rem]' /> */}
    </div>
  );
};

export default MobileHeader;
