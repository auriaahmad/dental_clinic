import { request } from './request';

export const registerUserAPI = ({ name, email, password, phoneNumber }) =>
  request({
    url: '/auth/dentist/register',
    method: 'POST',
    data: { name, email, password, phoneNumber },
  });

export const loginUserAPI = ({ email, password }) =>
  request({
    url: '/auth/dentist/login',
    method: 'POST',
    data: { email, password },
  });

export const logoutUserAPI = () =>
  request({
    url: '/auth/dentist/logout',
    method: 'DELETE',
  });

export const requestPasswordResetAPI = data =>
  request({
    url: '/auth/dentist/requestReset',
    method: 'PATCH',
    data,
  });

export const verifyOTPAPI = data =>
  request({
    url: '/auth/dentist/verifyOTP',
    method: 'PATCH',
    data,
  });

export const resetPasswordAPI = data =>
  request({
    url: '/auth/dentist/resetPassword',
    method: 'PATCH',
    data,
  });

export const authenticateUser = async () =>
  request({
    url: `/auth/dentist/authenticate`,
    method: 'GET',
  });
