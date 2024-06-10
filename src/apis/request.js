import axios from 'axios';
import { toast } from 'react-toastify';

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

export const request = function (options) {
  const onSuccess = function (response) {
    if (response.data.message) toast(response.data.message, { toastId: 1 });
    return response.data;
  };

  const onError = function (error) {
    if (error.response) {
      console.log(error);
      if (error.response.status == 401) {
        document.cookie = `planilinkaccesstok=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `planilinkrefreshtok=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/auth/signin`;
      }
      if (error.response.data) {
        toast.error(error.response?.data?.message, { toastId: 1 });
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    // return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};
