import { request } from './request';

export const createPricingAPI = data =>
  request({
    url: '/company/pricing',
    method: 'POST',
    data,
  });

export const createComplimentaryProductAPI = data =>
  request({
    url: '/company/pricing/complimentary',
    method: 'POST',
    data,
  });

export const editPricingForCompanyAPI = data =>
  request({
    url: '/company/pricing',
    method: 'PUT',
    data,
  });

export const editPricingNameForCompanyAPI = data =>
  request({
    url: '/company/pricing/name',
    method: 'PATCH',
    data,
  });

export const editComplimentaryProductForCompanyAPI = data =>
  request({
    url: '/company/pricing/complimentary',
    method: 'PUT',
    data,
  });

export const deletePricingForCompanyAPI = _pricing =>
  request({
    url: `/company/pricing/${_pricing}`,
    method: 'DELETE',
  });

export const deleteComplimentaryProductForCompanyAPI = _product =>
  request({
    url: `/company/pricing/complimentary/${_product}`,
    method: 'DELETE',
  });

export const getPricingProductsForCompanyAPI = () =>
  request({
    url: '/company/pricing',
    method: 'GET',
  });

export const getPricingProductsForDentistAPI = () =>
  request({
    url: '/dentist/pricing',
    method: 'GET',
  });
