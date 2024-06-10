import { request } from './request';

export const getNotificationsForCompanyAPI = type =>
  request({
    url: `/company/notification/${type || 'notifications'}`,
    method: 'GET',
  });

export const getUnreadNotificationsForCompanyAPI = type =>
  request({
    url: `/company/notification/unreadCount/${type || 'all'}`,
    method: 'GET',
  });

export const getNotificationsForDentistAPI = type =>
  request({
    url: `/dentist/notification/${type || 'all'}`,
    method: 'GET',
  });

export const getUnreadNotificationsForDentistAPI = type =>
  request({
    url: `/dentist/notification/unreadCount/${type || 'notifications'}`,
    method: 'GET',
  });

export const deleteNotificationForCompanyAPI = _notification =>
  request({
    url: `/company/notification/${_notification}`,
    method: 'DELETE',
  });

export const deleteAllNotificationsForCompanyAPI = type =>
  request({
    url: `/company/notification/clearAll/${type || 'notifications'}`,
    method: 'DELETE',
  });

export const deleteNotificationForDentistAPI = _notification =>
  request({
    url: `/dentist/notification/${_notification}`,
    method: 'DELETE',
  });

export const deleteAllNotificationsForDentistAPI = type =>
  request({
    url: `/dentist/notification/clearAll/${type || 'notifications'}`,
    method: 'DELETE',
  });
