import axios from 'axios';
import { request } from './request';

export const getBillingsForCompanyAPI = ({
  skip,
  limit,
  userSearchKeyword,
  patientSearchKeyword,
}) =>
  request({
    url: `/company/billing/invoices?skip=${skip}&limit=${limit}&userSearchKeyword=${userSearchKeyword}&patientSearchKeyword=${patientSearchKeyword}`,
    method: 'GET',
  });

export const downloadInvoiceAPI = _invoice =>
  axios.get(
    `${process.env.REACT_APP_SERVER_URL}/company/billing/downloadInvoice/${_invoice}`
  );

export const getBillingsForDentistAPI = ({
  skip,
  limit,
  patientSearchKeyword,
}) =>
  request({
    url: `/dentist/billing/invoices?skip=${skip}&limit=${limit}&patientSearchKeyword=${patientSearchKeyword}`,
    method: 'GET',
  });

export const deleteBillingInvoiceForCompanyAPI = _invoice =>
  request({
    url: `/company/billing/invoice/${_invoice}`,
    method: 'DELETE',
  });

export const searchUsersForCompanyAPI = ({ skip, limit, userSearchKeyword }) =>
  request({
    url: `/company/user?skip=${skip}&limit=${limit}&userSearchKeyword=${userSearchKeyword}`,
    method: 'GET',
  });

export const createManualInvoiceForCompanyAPI = data =>
  request({
    url: `/company/billing/manualInvoice`,
    method: 'POST',
    data,
  });

export const searchItemsForCompanyAPI = ({
  skip,
  limit,
  searchKeyword,
  type,
  item,
}) =>
  request({
    url: `/company/billing/items?skip=${skip}&limit=${limit}&searchKeyword=${searchKeyword}&type=${type}&item=${item}`,
    method: 'GET',
  });

export const uploadInvoiceForCompanyAPI = formData =>
  axios.post(
    `${process.env.REACT_APP_SERVER_URL}/company/billing/uploadInvoice`,
    formData,
    {
      withCredentials: true,
    }
  );

export const updateBillingMessageStatusAPI = _billing =>
  request({
    url: `/dentist/billing/updateMessageStatus`,
    method: 'PATCH',
    data: { _billing },
  });
