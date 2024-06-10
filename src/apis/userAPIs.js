import { request } from './request';

export const updateMyProfile = data =>
  request({ url: '/dentist', method: 'PATCH', data });

export const getUsersForCompanyAPI = ({ skip, limit, searchKeyword }) =>
  request({
    url: `/company/user?skip=${skip}&limit=${limit}&searchKeyword=${searchKeyword}`,
    method: 'GET',
  });

export const getUserByIDForCompanyAPI = _user =>
  request({ url: `/company/user/userById/${_user}`, method: 'GET' });

export const toggleBlockUserForCompanyAPI = _user =>
  request({ url: `/company/user/toggleBlock/${_user}`, method: 'PATCH' });

export const deleteUserForCompanyAPI = _user =>
  request({ url: `/company/user/${_user}`, method: 'DELETE' });

export const getAllDentistsForCompanyAPI = () =>
  request({ url: `/company/user/dentists`, method: 'GET' });

export const setUserLangAPI = (lang, user) =>
  request({ url: `/gen/lang`, method: 'POST', data: { lang, user } });
