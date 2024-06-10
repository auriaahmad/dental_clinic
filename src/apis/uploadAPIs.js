import axios from 'axios';
import { request } from './request';

export const getPreSignedURLAPI = ({ type, fileName }) =>
  request({
    url: `/gen/uploads/preSignedURL`,
    method: 'POST',
    data: { fileType: type, fileName },
  });

// Upload Image
export const uploadToS3 = async (url, file) =>
  axios.put(url, file, {
    headers: {
      ContentType: file.type,
    },
  });
