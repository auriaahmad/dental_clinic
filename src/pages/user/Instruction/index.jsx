import backArrowCircle from '../../../assets/backArrowCircle.svg';
import downloadSky from '../../../assets/downloadSky.svg';
import cameraGray from '../../../assets/cameraGray.svg';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../../hooks/useHelpers';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { getInstructionByIDAPI } from '../../../apis/plansAPI';
import { useGlobalStore } from '../../../store/store';
import PlanCard from '../../../components/common/PlanCard';
import FWButton from '../../../components/form/FWButton';
import { planningStatuses } from '../../../helpers/planning';
import { addEllipsis } from '../../../helpers/general';

const Instruction = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const {
    lang: language,
    setLoading,
    loading,
    user,
  } = useGlobalStore(state => state);
  const { navigateToPage } = useHelpers();

  const [instruction, setInstruction] = useState();

  const _instruction = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  useEffect(() => {
    const getPlanByID = async () => {
      setLoading(true);
      const response = await getInstructionByIDAPI(_instruction);
      if (response) {
        setInstruction(response.instruction);
        // setPlan(response.plan);
      }
      setLoading(false);
    };
    getPlanByID();
  }, []);

  const downloadFile = () => {
    if (!instruction?.files || instruction?.files.length < 1) return;

    instruction?.files.forEach(url => {
      window.open(url, '_blank');
    });
  };

  return (
    <form className='patientPlans changePlan'>
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => {
            navigateToPage(
              user.type === 'company'
                ? `/company/plannings/patient-plan-record/${instruction?._plan?._id}`
                : `/user/plannings/patient-plan-treatments/${instruction?._plan?._id}`
            );
          }}
        />
      </div>
      <div className='patientPlans__nav'>
        <div className='patientPlans__nav__summaries'>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('planInstructions.patient')}:</label>
              <span>{instruction?._plan?._patient?.name}</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('planInstructions.product')}:</label>
              <span>
                {addEllipsis(
                  instruction?._plan?.['_patient']?.products?.find(
                    prod =>
                      prod._product === instruction?._plan?.['_product']?._id
                  )?.productName || instruction?._plan?._product?.product,
                  20
                )}
              </span>
            </div>
          </div>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('planInstructions.planningNumber')}:</label>
              <span>{instruction?._plan?.planningNumber}</span>
            </div>

            <span className='color-sky'>
              {planningStatuses.includes(instruction?._plan.status)
                ? t(`planningStatuses.${instruction?._plan.status}`)
                : instruction?._plan.status}
            </span>
          </div>
        </div>
        <div className='patientPlans__nav__right'>
          <div
            className='w-[90px] h-[90px] rounded-full overflow-hidden flex items-center justify-center patientImage'
            style={{ boxShadow: '0px 4px 40px 0px #0000001A' }}
          >
            {!instruction?._plan?._patient?.patientImage ? (
              <div>
                <img src={cameraGray} alt='' />
              </div>
            ) : (
              <div className='relative'>
                <img src={instruction?._plan?._patient?.patientImage} alt='' />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='changePlan__files shadow-container flex'>
        <div className='w-[80%] text-center'>
          {instruction?.files?.length < 1 ? (
            <h3 className='heading-3'>{t('planInstructions.No Files')}</h3>
          ) : (
            <h3 className='heading-3'>
              {instruction?.files?.length} {t('planInstructions.Files')}
            </h3>
          )}
        </div>
        <div>
          <img
            src={downloadSky}
            alt=''
            className='absolute bottom-4 cursor-pointer right-4 w-[1.125rem] h-[1.125rem]'
            onClick={downloadFile}
          />
        </div>
      </div>

      <div className='changePlan__writtenInsts '>
        <h2 className='text-[24px] text-grayish'>{t('planInstructions.WI')}</h2>
        <div className='shadow-container changePlan__writtenInsts__instructs'>
          <textarea
            id=''
            cols='30'
            rows='5'
            name='instructions'
            className='w-full bg-[#F3F4F5]'
            required={true}
            value={instruction?.instructions}
          />
          {/* <img src={expandGray} alt='' /> */}
        </div>
      </div>
      <div className='changePlan__plans'>
        <h2 className='text-[24px] text-grayish'>{t('newPlan.CP')}</h2>
        <PlanCard
          selected={instruction?._plan?._product?._id}
          id={instruction?._plan?._product?._id}
          setSelected={id => {
            return;
          }}
          product={instruction?._plan?._product}
          key={instruction?._plan?._product?._id}
        />
      </div>
      <div className='changePlan__note'>
        <span>{t('newPlan.Note')}</span>
      </div>
      {instruction?._plan?._complimentaryProduct && (
        <FWButton
          title={`${instruction?._plan?._complimentaryProduct?.product}: ${instruction?._plan?._complimentaryProduct?.price}$`}
          variant='whiteSky'
          type='button'
          style={{
            background: '#F1FBFF',
            border: '1px solid #00B0F0',
            marginBottom: '1rem',
          }}
          onClick={() => {}}
        />
      )}
    </form>
  );
};

const styles = {
  payBtnStyle: {
    background: '#FFD966',
    color: '#12083A',
    fontWeight: '500',
    height: '48px',
    width: '171px',
  },
};

export default Instruction;
