import { useEffect, useMemo, useState } from 'react';
import backArrowCircle from '../../../assets/backArrowCircle.svg';
import SuccessModal from '../../../components/common/SuccessModal';
import Table from '../../../components/common/Table';
import SmButton from '../../../components/form/SmButton';
import { patientPlansMockData } from '../../../shared/mock';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../../hooks/useHelpers';
import PatientPlansTable from './components/PlansTable';
import { useLocation } from 'react-router';
import { deletePatientForCompanyAPI } from '../../../apis/plansAPI';
import { useGlobalStore } from '../../../store/store';

const PatientPlans = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { lang } = useGlobalStore(state => state.lang);
  const setLoading = useGlobalStore(state => state.setLoading);
  const { navigateToPage } = useHelpers();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setOpenDeleteModal(false);

  const [data, setData] = useState([]);
  const [patient, setPatient] = useState();

  const _patient = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  useEffect(() => {
    if (openDeleteModal) {
      setTimeout(() => {
        handleDeleteModalClose();
      }, 2000);
    }
  }, [openDeleteModal]);

  const deletePatient = async () => {
    const confirm = window.confirm(
      lang === 'es' ? '¿Quieres eliminar esto?' : 'Do you want to delete this?'
    );
    if (!confirm) return;
    setLoading(true);
    const response = await deletePatientForCompanyAPI(_patient);
    if (response) {
      setData([]);
      setLoading(false);
    }
  };

  const pagePath = [
    t(`pageHistory.Plannings`),
    t(`pageHistory.Patient planning`),
  ];

  return (
    <div className='patientPlans'>
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => navigateToPage('/company/plannings')}
        />

        <div className='pagePath'>
          {pagePath.map((page, index) => {
            return (
              <>
                <span
                  style={
                    index === pagePath.length - 1 ? { color: '#E9734A' } : {}
                  }
                >
                  {page}
                </span>
                <span className='ml-2 mr-2 text-[red]'>
                  {index !== pagePath.length - 1 ? ' / ' : ''}
                </span>
              </>
            );
          })}
        </div>
      </div>
      <div className='patientPlans__nav'>
        <div className='patientPlans__nav__summary'>
          <div className='patientPlans__nav__summary__item'>
            <label>{t('patientPlans.U')}:</label>
            <span>{patient?._dentist?.name}</span>
          </div>
          <div className='patientPlans__nav__summary__item'>
            <label>{t('patientPlans.P')}:</label>
            <span>{patient?.name}</span>
          </div>
        </div>
        <div>
          <SmButton
            variant='medium'
            title='Delete Patient'
            theme='dangerBordered'
            onClick={deletePatient}
          />
        </div>
      </div>
      <PatientPlansTable
        data={data}
        setData={setData}
        _patient={_patient}
        setPatient={setPatient}
      />
      <SuccessModal
        open={openDeleteModal}
        handleClose={handleDeleteModalClose}
        message={t('patientPlans.DS')}
      />
    </div>
  );
};

export default PatientPlans;
