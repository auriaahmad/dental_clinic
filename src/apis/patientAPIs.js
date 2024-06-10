import { request } from './request';

export const updatePatientAPI = ({ _patient, patientImage }) =>
  request({
    url: `/dentist/patient`,
    method: 'PATCH',
    data: { _patient, patientImage },
  });
