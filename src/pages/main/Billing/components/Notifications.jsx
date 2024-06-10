import React from "react";
import NotificationModal from "../../../../components/common/NotificationModal";
import cross from "../../../../assets/crossGray.svg";
import { useTranslation } from "react-i18next";


const Notifications = ({ open, handleClose, notifications }) => {
  const { t } = useTranslation();
  return (
    <NotificationModal
      open={open}
      onClose={handleClose}
      style={{ display: "none" }}
    >
      <div className='max-w-[349px] bg-white rounded-[16px] notifications'>
        <div className='w-full p-[12px] flex justify-between bg-transparent notifications__header'>
          <div className='text-sky-500 font-semibold'>{t("billing.notifications")}</div>
          <button className='text-red-600 font-semibold text-[14px]'>
          {t("billing.deleteAllButton")}
          </button>
        </div>
        {notifications.map(notification => (
          <div className='flex w-full space-x-[8px] h-[105px] p-[16px] notifications__header notifications__bgColor'>
            <p className=' w-[334px] justify-between leading-[24px] font-normal text-[16px] '>
              {notification.data}
            </p>
            <button className='h-[20px] w-[20px]'>
              <img src={cross} alt='cross' />
            </button>
          </div>
        ))}
      </div>
    </NotificationModal>
  );
};

export default Notifications;
