import { request } from './request';

export const createQueryAPI = data =>
  request({
    url: '/dentist/query',
    method: 'POST',
    data,
  });

export const createQueryForCompanyAPI = data =>
  request({
    url: '/company/query',
    method: 'POST',
    data,
  });

export const getUserQueriesAPI = () =>
  request({
    url: '/dentist/query/userQuery',
    method: 'GET',
  });

export const getQueryByIDAPI = _query =>
  request({
    url: `/dentist/query/queryById/${_query}`,
    method: 'GET',
  });

export const getQueryByIDForCompanyAPI = _query =>
  request({
    url: `/company/query/queryById/${_query}`,
    method: 'GET',
  });

export const deleteQueryForCompanyAPI = _query =>
  request({
    url: `/company/query/${_query}`,
    method: 'DELETE',
  });
