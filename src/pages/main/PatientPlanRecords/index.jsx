import { useEffect, useMemo, useState } from 'react';
import backArrowCircle from '../../../assets/backArrowCircle.svg';
import Table from '../../../components/common/Table';
import SmButton from '../../../components/form/SmButton';
import { patientPlanRecordsMockData } from '../../../shared/mock';
import UploadPlanModal from './components/UploadPlanModal';
import editPencelGray from '../../../assets/editPencilGray.svg';
import ChangeProductModal from './components/ChangeProductModal';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../../hooks/useHelpers';
import { useLocation } from 'react-router';
import { getPlanByIDForCompanyAPI } from '../../../apis/plansAPI';
import InstructionsTable from './components/InstructionsTable';
import { useGlobalStore } from '../../../store/store';
import { planningStatuses } from '../../../helpers/planning';
import useScreenSize from '../../../hooks/useResize';

const PatientPlanRecords = () => {
  const location = useLocation();
  const { navigateToPage } = useHelpers();
  const setLoading = useGlobalStore(state => state.setLoading);

  const [uploadPlanModalOpen, setUploadPlanModalOpen] = useState(false);
  const [changeProductModalOpen, setChangeProductModalOpen] = useState(false);
  const { t } = useTranslation();

  const { width: screenWidth } = useScreenSize();

  const closeUploadPlanModal = () => setUploadPlanModalOpen(false);
  const closeChangePlanModal = () => setChangeProductModalOpen(false);

  const [plan, setPlan] = useState();
  const [instructions, setInstructions] = useState([]);

  const _plan = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  useEffect(() => {
    const getPlanByID = async () => {
      setLoading(true);
      const response = await getPlanByIDForCompanyAPI(_plan);
      if (response) {
        setPlan(response.plan);
        setLoading(false);
      }
    };
    getPlanByID();
  }, []);

  const pagePath = [
    t(`pageHistory.Plannings`),
    t(`pageHistory.Patient planning`),
    t(`pageHistory.History of a planning`),
  ];

  return (
    <div className='patientPlans'>
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() =>
            navigateToPage(
              `/company/plannings/patient-plans/${plan?._patient._id}`
            )
          }
        />
        <div>
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
      </div>
      <div
        className='patientPlans__nav'
        style={screenWidth < 650 ? { flexFlow: 'column' } : {}}
      >
        <div className='patientPlans__nav__summaries'>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('patientPlanRecord.user')}:</label>
              <span>{plan?._dentist.name}</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('patientPlanRecord.patient')}:</label>
              <span>{plan?._patient.name}</span>
            </div>
            <div className='color-sky patientPlans__nav__summary__item--status'>
              {planningStatuses.includes(plan?.['status'])
                ? t(`planningStatuses.${plan?.['status']}`)
                : plan?.['status']}
            </div>
          </div>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('patientPlanRecord.planningNumber')}:</label>
              <span>{plan?.planningNumber}</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('patientPlanRecord.product')}:</label>
              <span>
                {/* {plan?._patient?.products?.find(
                  prod => prod._product === plan?._product?._id
                )?.productName || plan?._product?.product} */}
                {plan?.product?.name || plan?._product?.product}
              </span>
              <img
                src={editPencelGray}
                alt=''
                className='cursor-pointer'
                onClick={() => setChangeProductModalOpen(true)}
              />
            </div>
          </div>
        </div>
        <div
          className='patientPlans__nav__ll'
          style={
            screenWidth < 650
              ? {
                  position: 'inline-block',

                  left: 0,
                  bottom: '-0.5rem',

                  transform: 'translateX(0)',
                }
              : {}
          }
        >
          <SmButton
            variant='medium'
            title='Upload New Plan'
            theme='primary'
            onClick={() => setUploadPlanModalOpen(true)}
          />
        </div>
      </div>
      <InstructionsTable
        _plan={_plan}
        data={instructions}
        setData={setInstructions}
      />
      <UploadPlanModal
        open={uploadPlanModalOpen}
        handleClose={closeUploadPlanModal}
        _plan={_plan}
        setInstructions={setInstructions}
        setPlan={setPlan}
        instructions={instructions}
      />
      <ChangeProductModal
        open={changeProductModalOpen}
        handleClose={closeChangePlanModal}
        plan={plan}
        setPlan={setPlan}
      />
    </div>
  );
};

export default PatientPlanRecords;
