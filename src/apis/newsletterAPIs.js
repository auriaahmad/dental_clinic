import { request } from './request';

export const addUserForNewsletterAPI = email =>
  request({
    url: `/gen/newsletter/addUser`,
    method: 'POST',
    data: { email },
  });
