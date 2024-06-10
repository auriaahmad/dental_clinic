import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useGlobalStore } from '../../store/store';

const CookiesPopup = ({ isOpen, setIsOpen }) => {
  const { updateCookiesChoice } = useGlobalStore();
  const closeModal = () => setIsOpen(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal} static>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className='w-[90%] translate-x-[-4px] sm:w-auto rounded-2xl bg-[#2D3045] px-5 py-5 sm:px-7 text-left shadow-xl transition-all relative'
                as='div'
              >
                <i
                  className='fa-solid fa-x absolute right-5 sm:right-8 cursor-pointer text-[#737794]'
                  onClick={closeModal}
                ></i>
                <div className='max-w-[300px] sm:w-full  sm:max-w-[550px]'>
                  <Dialog.Title
                    as='h3'
                    className='text-[20px] sm:text-[24px] font-medium leading-6 text-white'
                  >
                    Cookies Settings
                  </Dialog.Title>
                  <div className='mt-5 sm:mt-8 mb-11'>
                    <p className='text-[14px] sm:text-[20px] leading-[24px] tracking-[-0.1%] text-[#737794]'>
                      We use cookies and similar technologies to help
                      personalize content, tailor and measure ads, and provide a
                      better experience. By clicking accept, you agree to this,
                      as outlined in our Cookie Policy.
                    </p>
                  </div>

                  <div className='flex gap-5'>
                    <button
                      type='button'
                      className='inline-flex outline-none justify-center border rounded-[3rem] items-center border-transparent bg-[#00B0F0] px-6 w-full h-[44px] sm:h-[56px] py-5 text-sm font-bold text-[#0A0D23] '
                      onClick={() => {
                        updateCookiesChoice({
                          accepted: true,
                          rejected: false,
                        });

                        closeModal();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center border rounded-[3rem] text-[#00B0F0] items-center border-transparent bg-[#7377944D] px-6 w-full h-[44px] sm:h-[56px] py-5 text-sm font-bold'
                      onClick={() => {
                        updateCookiesChoice({
                          accepted: false,
                          rejected: true,
                        });
                        closeModal();
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CookiesPopup;
