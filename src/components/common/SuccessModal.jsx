import React, { Fragment } from "react";
import successCircle from "../../assets/successCircle.svg";
import { Dialog, Transition } from "@headlessui/react";

const SuccessModal = ({ open, handleClose, message }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-30' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-[#00000033] bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className={
                  "w-[376px] h-[221.5px] bg-white rounded-[32px] py-8 px-6 flex flex-col items-center justify-center gap-[30px] "
                }
              >
                <img
                  src={successCircle}
                  alt=''
                  className='w-[99.5px] h-[99.5px]'
                />
                <h3 className='text-[20px] font-medium'>{message}</h3>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SuccessModal;
