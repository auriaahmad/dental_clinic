import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useScreenSize from '../../hooks/useResize';
import cross from '../../assets/crossGray.svg';
import bell from '../../assets/Notification.svg';
import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../../store/store';
import {
  deleteAllNotificationsForCompanyAPI,
  deleteAllNotificationsForDentistAPI,
  deleteNotificationForCompanyAPI,
  deleteNotificationForDentistAPI,
  getNotificationsForCompanyAPI,
  getNotificationsForDentistAPI,
  getUnreadNotificationsForCompanyAPI,
  getUnreadNotificationsForDentistAPI,
} from '../../apis/notificationAPIs';
import { notificationMessages } from '../../helpers/notifications';
import { toast } from 'react-toastify';
import Loading from './Loading';

const Notification = () => {
  const { t } = useTranslation();
  const { width: screenWidth } = useScreenSize();
  const [loading, setLoading] = useState(true);
  const { user, lang } = useGlobalStore(state => state);

  const [notifications, setNotifications] = useState([]);
  const [unreadNotificationCountNots, setUnreadNotificationsCountNots] =
    useState();
  const [unreadNotificationCountQuery, setUnreadNotificationsCountQuery] =
    useState();
  const [notificationType, setNotificationType] = useState();

  const getUnreadNotificationsCount = async () => {
    const response = await (user.type === 'company'
      ? getUnreadNotificationsForCompanyAPI()
      : getUnreadNotificationsForDentistAPI());
    if (response) {
      console.log(response);
      setUnreadNotificationsCountNots(
        response.notificationsCount === 0 ? '' : response.notificationsCount
      );
      setUnreadNotificationsCountQuery(
        response.notificationsCountQuery === 0
          ? ''
          : response.notificationsCountQuery
      );
    }
  };

  useEffect(() => {
    getUnreadNotificationsCount();
  }, []);

  const fetchNotification = async type => {
    setLoading(true);
    setNotificationType(type);
    const response = await (user.type === 'company'
      ? getNotificationsForCompanyAPI(type)
      : getNotificationsForDentistAPI(type));
    if (response) {
      console.log(response.notifications, '[p[[');
      setNotifications(response.notifications);
      setLoading(false);
      type === 'notifications'
        ? setUnreadNotificationsCountNots()
        : setUnreadNotificationsCountQuery();
    }
  };

  const prepareNotification = notification => {
    if (notification.type === 'new-plan')
      return `${notification._user.name} ${notificationMessages['new-plan'][lang]} ${notification?._patient?.name}.`;
    else if (notification.type === 'instruction-added')
      return `${notification._user.name} ${notificationMessages['instruction-added'][lang]} ${notification?._patient?.name}.`;
    else if (notification.type === 'plan-approved')
      return `${notification._user.name} ${notificationMessages['plan-approved'][lang]} ${notification?._patient?.name}.`;
    else if (notification.type === 'query')
      return `${
        notification.notificationFor === 'dentist'
          ? 'PlaniLink'
          : notification._user.name
      } ${notificationMessages['query'][lang]}.`;
    else if (notification.type === 'treatment-added')
      return `PlaniLink ${notificationMessages['treatment-added'][lang]} ${notification?._patient?.name}.`;
    else if (notification.type === 'status-updated')
      return `PlaniLink ${notificationMessages['status-updated'][lang]} ${notification?._patient?.name}.`;
    else if (notification.type === 'message')
      return `${
        notification.notificationFor === 'dentist'
          ? 'PlaniLink'
          : notification?._user.name
      } ${notificationMessages['message'][lang]}.`;

    return `New Notification!`;
  };

  const deleteNotification = async _notification => {
    const response = await (user.type === 'company'
      ? deleteNotificationForCompanyAPI(_notification)
      : deleteNotificationForDentistAPI(_notification));
    if (response) {
      toast(t('messages.success'), { toastId: 1 });
      const notificationIndex = notifications.findIndex(
        item => item._id === _notification
      );
      notifications.splice(notificationIndex, 1);
      setNotifications([...notifications]);
    }
  };

  const deleteAllNotifications = async () => {
    const response = await (user.type === 'company'
      ? deleteAllNotificationsForCompanyAPI(notificationType)
      : deleteAllNotificationsForDentistAPI(notificationType));
    if (response) {
      toast(t('messages.success'), { toastId: 1 });
      setNotifications([]);
    }
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      {({ open }) => (
        <>
          <div className='flex items-center  h-[1.55rem]'>
            <Menu.Button
              onClick={() => fetchNotification('query')}
              className='relative '
            >
              <i className='fa-regular fa-bell text-[1.25rem] text-[#00BBF4]'></i>
              {/* <img src={bell} alt='bell' /> */}

              {unreadNotificationCountQuery && (
                <div className='w-[1rem] pt-[1px] flex items-center justify-center text-[0.7rem] h-[1rem] text-white absolute right-[-0.4rem] top-[-0.25rem] bg-[#FF0000] rounded-full'>
                  {unreadNotificationCountQuery}
                </div>
              )}
            </Menu.Button>
            <Menu.Button
              onClick={() => fetchNotification('notifications')}
              className='relative'
            >
              <i className='fa-regular fa-bell text-[1.25rem]'></i>
              {/* <img src={bell} alt='bell' /> */}
              {unreadNotificationCountNots && (
                <div className='w-[1rem] pt-[1px] flex items-center justify-center text-[0.7rem] h-[1rem] text-white absolute right-[-0.4rem] top-[-0.25rem] bg-[#FF0000] rounded-full'>
                  {unreadNotificationCountNots}
                </div>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              className={twMerge(
                `absolute right-0  top-3 z-30 mt-[14px] w-fit min-w-[280px] origin-top-left overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-w-[349px] bg-white rounded-[16px] notifications`,
                screenWidth < 901 && 'right-[-6rem] max-w-[300px]'
              )}
              style={
                screenWidth < 600
                  ? { maxWidth: '300px' }
                  : { maxWidth: '349px' }
              }
            >
              {notifications.length < 1 || loading ? (
                <div className='w-full h-[10rem] flex items-center justify-center'>
                  {!loading ? (
                    <h5 className='heading-6'>
                      {t('messages.noNotifications')}
                    </h5>
                  ) : (
                    <Loading isSmall={true} />
                  )}
                </div>
              ) : (
                <>
                  <div className='w-full p-[12px] flex justify-between bg-transparent notifications__header'>
                    <div className='text-sky-500 font-semibold'>
                      {t('mainLayout.notification')}
                    </div>
                    <button
                      className='text-red-600 font-semibold text-[14px]'
                      onClick={() => deleteAllNotifications()}
                    >
                      {t('mainLayout.deleteAll')}
                    </button>
                  </div>
                  <div className='max-h-[25rem] overflow-y-auto'>
                    {notifications.map(notification => (
                      <Menu.Item key={notification.key}>
                        <div className='flex w-full space-x-[8px]  p-[16px] notifications__header notifications__bgColor'>
                          <p className=' w-[334px] justify-between leading-[24px] font-normal text-[16px] '>
                            {prepareNotification(notification)}
                          </p>
                          <button className='h-[20px] w-[20px]'>
                            <img
                              src={cross}
                              alt='cross'
                              onClick={() =>
                                deleteNotification(notification._id)
                              }
                            />
                          </button>
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default Notification;
