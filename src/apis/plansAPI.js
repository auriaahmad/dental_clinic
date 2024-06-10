import { request } from './request';

export const createPatientAPI = data =>
  request({
    url: '/dentist/plan/patient',
    method: 'POST',
    data,
  });

export const createUpdatePlanDraftAPI = data =>
  request({
    url: '/dentist/draft',
    method: 'POST',
    data,
  });

export const getPlanDraftByIDAPI = _draft =>
  request({
    url: `/dentist/draft/${_draft}`,
    method: 'GET',
  });

export const deletePlanDraftAPI = _draft =>
  request({
    url: `/dentist/draft/${_draft}`,
    method: 'DELETE',
  });

export const sendEmailsOnPlanCreationAPI = data =>
  request({
    url: `/dentist/billing/sendEmailsOnPayment`,
    method: 'POST',
    data,
  });

export const createPlanAPI = data =>
  request({
    url: '/dentist/plan',
    method: 'POST',
    data,
  });

export const addNewInstructionAPI = data =>
  request({
    url: '/dentist/plan/instruction',
    method: 'POST',
    data,
  });

export const approvePlanAPI = _plan =>
  request({
    url: `/dentist/plan/approvePlan/${_plan}`,
    method: 'PATCH',
  });

export const markPlanAsPaidAPI = _plan =>
  request({
    url: `/dentist/plan/markPaid/${_plan}`,
    method: 'PATCH',
  });

export const getPlanByIDAPI = _plan =>
  request({
    url: `/dentist/plan/planById/${_plan}`,
    method: 'GET',
  });

export const getInstructionByIDAPI = _instruction =>
  request({
    url: `/dentist/plan/instructionById/${_instruction}`,
    method: 'GET',
  });

export const getPlanInstructionsAPI = ({ skip, limit, _plan }) =>
  request({
    url: `/dentist/plan/planInstructions?skip=${skip}&limit=${limit}&_plan=${_plan}`,
    method: 'GET',
  });

export const getDentistPatientsAPI = ({ skip, limit, searchKeyword }) =>
  request({
    url: `/dentist/plan/patients?skip=${skip || 0}&limit=${
      limit || 20
    }&searchKeyword=${searchKeyword}`,
    method: 'GET',
  });

export const getPlansForDentistAPI = ({ skip, limit, searchKeyword }) =>
  request({
    url: `/dentist/plan?skip=${skip || 0}&limit=${
      limit || 20
    }&searchKeyword=${searchKeyword}`,
    method: 'GET',
  });

export const getPlansForCompanyAPI = ({
  skip,
  limit,
  patientSearchKeyword,
  userSearchKeyword,
}) =>
  request({
    url: `/company/plan?skip=${skip || 0}&limit=${
      limit || 20
    }&patientSearchKeyword=${patientSearchKeyword}&userSearchKeyword=${userSearchKeyword}`,
    method: 'GET',
  });

export const getPatientPlansForCompanyAPI = ({ _patient, skip, limit }) =>
  request({
    url: `/company/plan/patientPlans/${_patient}?skip=${skip || 0}&limit=${
      limit || 20
    }`,
    method: 'GET',
  });

export const getPatientPlansAPI = ({ _patient, skip, limit }) =>
  request({
    url: `/dentist/plan/plansByPatient/${_patient}?skip=${skip || 0}&limit=${
      limit || 20
    }`,
    method: 'GET',
  });

export const getPatientByIDAPI = _patient =>
  request({
    url: `/dentist/plan/patient/${_patient}`,
    method: 'GET',
  });

export const deletePatientForCompanyAPI = _patient =>
  request({
    url: `/company/plan/patient/${_patient}`,
    method: 'DELETE',
  });

export const deletePlanForCompanyAPI = _plan =>
  request({
    url: `/company/plan/${_plan}`,
    method: 'DELETE',
  });

export const getPlanByIDForCompanyAPI = _plan =>
  request({
    url: `/company/plan/planById/${_plan}`,
    method: 'GET',
  });

export const getPlanInstructionsForCompanyAPI = ({ skip, limit, _plan }) =>
  request({
    url: `/company/plan/instructions?skip=${skip}&limit=${limit}&_plan=${_plan}`,
    method: 'GET',
  });

export const addTreatmentPlanForCompanyAPI = data =>
  request({
    url: `/company/plan/instruction`,
    method: 'POST',
    data,
  });

export const deleteTreatmentPlanForCompanyAPI = _instruction =>
  request({
    url: `/company/plan/instructionTreatment/${_instruction}`,
    method: 'DELETE',
  });

export const getUserPlansForCompanyAPI = ({ _user, skip, limit }) =>
  request({
    url: `/company/plan/userPlans/${_user}?skip=${skip}&limit=${limit}`,
    method: 'GET',
  });

export const getUserQueriesForCompanyAPI = ({ skip, limit }) =>
  request({
    url: `/company/query/userQuery?skip=${skip}&limit=${limit}`,
    method: 'GET',
  });

export const editTreatmentPlanForCompanyAPI = data =>
  request({
    url: `/company/plan/instruction`,
    method: 'PATCH',
    data,
  });
