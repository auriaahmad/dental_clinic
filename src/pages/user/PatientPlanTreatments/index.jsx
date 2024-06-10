import { useEffect, useMemo, useState } from 'react';
import backArrowCircle from '../../../assets/backArrowCircle.svg';
import Table from '../../../components/common/Table';
import SmButton from '../../../components/form/SmButton';
import useHelpers from '../../../hooks/useHelpers';
import { patientPlanTreatmentsMockData } from '../../../shared/mock';
import { useTranslation } from 'react-i18next';
import { approvePlanAPI, getPlanByIDAPI } from '../../../apis/plansAPI';
import { useLocation } from 'react-router';
import InstructionsTable from './components/InstructionsTable';
import { toast } from 'react-toastify';
import { useGlobalStore } from '../../../store/store';
import { lang } from '../../../shared/languages/lang';
import useScreenSize from '../../../hooks/useResize';
import { planningStatuses } from '../../../helpers/planning';

const PatientPlanTreatments = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const language = useGlobalStore(state => state.lang);
  const { setLoading } = useGlobalStore(state => state);
  const { navigateToPage } = useHelpers();
  const [paid, setPaid] = useState(true);

  const [plan, setPlan] = useState();

  const { width: screenWidth } = useScreenSize();

  const _plan = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  useEffect(() => {
    const getPlanByID = async () => {
      const response = await getPlanByIDAPI(_plan);
      if (response) {
        setPlan(response.plan);
      }
    };
    getPlanByID();
  }, []);

  const approvePlan = async () => {
    const confirm = window.confirm(
      language === 'es'
        ? '¿Quieres aprobar esta planificación?'
        : 'Do you want to approve this planning?'
    );
    if (!confirm) return;

    if (plan?.status === 'Approved planning') return;
    setLoading(true);
    const response = await approvePlanAPI(_plan);
    if (response) {
      setPlan(response.approvedPlan);
      toast(lang[language].planApproved, { toastId: 1 });
    }
    setLoading(false);
  };

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
            plan &&
            navigateToPage(
              `/user/plannings/patient-plans/${plan?._patient?._id}`
            )
          }
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
      <div
        className='patientPlans__nav'
        style={{ marginBottom: screenWidth < 640 ? '3.5rem' : '0' }}
      >
        <div className='patientPlans__nav__summaries'>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('patientPlanTreatments.patient')}:</label>
              <span>{plan?._patient?.name}</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('patientPlanTreatments.product')}:</label>
              <span>
                {plan?.product?.name || plan?._product?.product}
                {/* {plan?.['_patient']?.products?.find(
                  prod => prod._product === plan?.['_product']?._id
                )?.productName || plan?._product?.product} */}
              </span>
            </div>
          </div>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('patientPlanTreatments.planningNumber')}:</label>
              <span>{plan?.planningNumber}</span>
            </div>

            <div className='color-sky flex w-auto text-[0.8rem] sm:text-[1rem]'>
              {planningStatuses.includes(plan?.status)
                ? t(`planningStatuses.${plan?.status}`)
                : plan?.status}
            </div>
          </div>
        </div>
        <div className='patientPlans__nav__newPlan'>
          {plan?.status === 'Planning pending approval' ||
          plan?.status === 'Waiting for the review by the Doctor' ||
          plan?.status === 'Waiting for new models' ? (
            <>
              <SmButton
                titleComplete={t('patientPlanTreatments.newInstructions')}
                variant='medium'
                onClick={() =>
                  navigateToPage(
                    `/user/plannings/new-plan-instructions/${_plan}`
                  )
                }
              />
              {plan?.status !== 'Waiting for new models' && (
                <SmButton
                  titleComplete={t('patientPlanTreatments.approve')}
                  variant='medium'
                  style={{
                    background: '#00B050',
                    // width: '171px',
                    // height: '48px',
                  }}
                  onClick={approvePlan}
                />
              )}
            </>
          ) : (
            plan?.status === 'sent' && (
              <SmButton
                titleComplete={t('patientPlanTreatments.pay')}
                variant='medium'
                style={{
                  background: '#FED966',
                  color: '#32395f',
                  width: '171px',
                  height: '48px',
                }}
                onClick={() => setPaid(true)}
              />
            )
          )}
        </div>
      </div>
      <InstructionsTable _plan={_plan} />
    </div>
  );
};

export default PatientPlanTreatments;
