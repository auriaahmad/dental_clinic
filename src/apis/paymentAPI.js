import { request } from './request';

export const createCheckoutSession = async data =>
  request({
    url: `/gen/payment/create-checkout-session`,
    method: 'POST',
    data,
  });

export const cancelCheckoutSession = async data =>
  request({
    url: `/gen/payment/cancelSession`,
    method: 'POST',
    data,
  });
