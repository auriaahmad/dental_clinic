import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import crossGray from '../../assets/crossGray.svg';
import useScreenSize from '../../hooks/useResize';

const Modal = ({ open, style, children, onClose }) => {
  const { width: screenWidth } = useScreenSize();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-30' onClose={onClose}>
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
          <div className='flex min-h-full  justify-center p-4 text-center items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 scale-100'
              leaveTo='opacity-0 translate-y-4 translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className={
                  'transform rounded-[2rem] bg-[#EDF2F6] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[520px] px-[15px] sm:px-[20px] py-[28px] sm:py-[28px] relative'
                }
                style={
                  style
                    ? style
                    : { maxWidth: screenWidth < 600 ? '350px' : '800px' }
                }
              >
                <div className='w-full relative'>
                  <img
                    src={crossGray}
                    alt=''
                    className='absolute right-0 top-0 cursor-pointer'
                    onClick={onClose}
                  />

                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
