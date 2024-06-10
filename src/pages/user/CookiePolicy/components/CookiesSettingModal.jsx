import React, { Fragment } from "react";
import FWButton from "../../../../components/form/FWButton";
import { Dialog, Transition } from "@headlessui/react";
import crossGray from "../../../../assets/crossGray.svg";
import { useTranslation } from "react-i18next";

const CookiesSettingModal = ({ open, handleClose }) => {
  const { t } = useTranslation();
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
                  "transform rounded-[2rem] bg-[#EDF2F6] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[554px] px-[28px] pt-[20px] pb-[28px] relative"
                }
              >
                <div className='w-full relative'>
                  <img
                    src={crossGray}
                    alt=''
                    className='absolute right-0 top-0 cursor-pointer'
                    onClick={handleClose}
                  />

                  <div className=''>
                    <h2 className='heading-2 m-0 p-0 mb-8'>
                      {t("CookiesSettingModal.CS")}
                    </h2>
                    <p className='text-[20px] mb-[44px] leading-6'>
                      {t("CookiesSettingModal.Note")}
                    </p>
                    <div className='flex justify-between space-x-[20px] h-[48px]'>
                      <div className='w-[239px] '>
                        <FWButton
                          title={t("CookiesSettingModal.A")}
                          variant='theme'
                          onClick={handleClose}
                        />
                      </div>
                      <div className='w-[239px]'>
                        <FWButton
                          title={t("CookiesSettingModal.P")}
                          variant='theme'
                          onClick={handleClose}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    // <Modal open={open} onClose={handleClose} style={{ maxWidth: "554px" }}>
    // <div className='h-[260px]'>
    //   <h2 className='heading-2 h-[29px]'>Cookies Settings</h2>
    //   <p className='text-[19px] h-[96px] mt-[32px]'>
    //     We use cookies and similar technologies to help personalize content,
    //     tailor and measure ads, and provide a better experience. By clicking
    //     accept, you agree to this, as outlined in our Cookie Policy.
    //   </p>
    //   <div className='flex justify-between space-x-[20px] h-[48px] mt-[44px]'>
    //     <div className='w-[239px] '>
    //       <FWButton title='Accept' variant='theme' />
    //     </div>
    //     <div className='w-[239px]'>
    //       <FWButton title='Preferences' variant='theme' />
    //     </div>
    //   </div>
    // </div>
    // </Modal>
  );
};

export default CookiesSettingModal;
