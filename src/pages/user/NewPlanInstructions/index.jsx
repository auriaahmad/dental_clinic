import backArrowCircle from '../../../assets/backArrowCircle.svg';
import uploadSky from '../../../assets/upload.png';
import cameraGray from '../../../assets/cameraGray.svg';
import downloadSky from '../../../assets/downloadSky.svg';
import crossGray from '../../../assets/crossGray.svg';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../../hooks/useHelpers';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { addNewInstructionAPI, getPlanByIDAPI } from '../../../apis/plansAPI';
import { getPreSignedURLAPI, uploadToS3 } from '../../../apis/uploadAPIs';
import { toast } from 'react-toastify';
import SmButton from '../../../components/form/SmButton';
import { lang } from '../../../shared/languages/lang';
import { useGlobalStore } from '../../../store/store';

const NewPlanInstructions = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const {
    lang: language,
    setLoading,
    loading,
  } = useGlobalStore(state => state);
  const { navigateToPage } = useHelpers();
  const modelsToUploadRef = useRef();

  const [modelsToUpload, setModelsToUpload] = useState([]);
  const [plan, setPlan] = useState();
  const [instruction, setInstruction] = useState({
    _plan: '',
    instructions: '',
    files: [],
    type: 'dentist',
  });

  const _plan = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  useEffect(() => {
    const getPlanByID = async () => {
      setLoading(true);
      const response = await getPlanByIDAPI(_plan);
      if (response) {
        setPlan(response.plan);
      }
      setLoading(false);
    };
    getPlanByID();
  }, []);

  const changeHandler = event => {
    const { name, value, files } = event.target;

    if (name === 'modelsToUpload') {
      return setModelsToUpload(Array.from(files));
    }

    setInstruction(pS => ({
      ...pS,
      [name]: value,
    }));
  };

  const selectModels = async () => modelsToUploadRef.current.click();

  const submitHandler = async event => {
    event.preventDefault();
    if (loading) return;

    if (!instruction.instructions)
      return toast.error('Please fill the form correctly!', { toastId: 1 });

    setLoading(true);
    for (let i = 0; i < modelsToUpload?.length; i++) {
      const splittedFileName = modelsToUpload[i].name.split('/');
      let fileType = splittedFileName[splittedFileName.length - 1];
      let fileName = modelsToUpload[i].name.replace(`.${fileType}`, '');

      const { url: modelsToUploadPreSignedURL } = await getPreSignedURLAPI({
        type: modelsToUpload[i].type,
        fileName,
      });
      const s3Response = await uploadToS3(
        modelsToUploadPreSignedURL,
        modelsToUpload[i]
      );
      instruction.files.push(s3Response?.config?.url?.split('?')[0]);
    }
    setInstruction({ ...instruction, _plan });

    const response = await addNewInstructionAPI({ ...instruction, _plan });
    if (response) {
      toast(lang[language], { toastId: 1 });
      navigateToPage(`/user/plannings/patient-plan-treatments/${_plan}`);
    }
    setLoading(false);
  };

  const downloadFile = () => {
    if (!modelsToUpload || modelsToUpload.length < 1) return;

    for (const file of modelsToUpload) {
      const fileName = file.name;
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <form className='patientPlans changePlan' onSubmit={submitHandler}>
      <input
        type='file'
        name='modelsToUpload'
        onChange={changeHandler}
        className='hidden'
        ref={modelsToUploadRef}
        multiple
      />
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() =>
            navigateToPage(
              `/user/plannings/patient-plan-treatments/${plan._id}`
            )
          }
        />
      </div>
      <div className='patientPlans__nav'>
        <div className='patientPlans__nav__summaries'>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('planInstructions.patient')}:</label>
              <span>{plan?._patient?.name}</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('planInstructions.product')}:</label>
              <span>{plan?._product?.product}</span>
            </div>
          </div>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('planInstructions.planningNumber')}:</label>
              <span>{plan?.planningNumber}</span>
            </div>

            <span className='color-sky'>
              {t(`planningStatuses.${plan?.status}`)}
            </span>
          </div>
        </div>
        <div className='patientPlans__nav__right'>
          <div
            className='w-[90px] h-[90px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'
            style={{ boxShadow: '0px 4px 40px 0px #0000001A' }}
          >
            {!plan?._patient?.patientImage ? (
              <img src={cameraGray} alt='' />
            ) : (
              <img src={plan?._patient?.patientImage} alt='' />
            )}
          </div>
        </div>
      </div>

      <div className='changePlan__files shadow-container flex'>
        <div
          className='w-[80%] cursor-pointer text-center'
          onClick={selectModels}
        >
          {(instruction?.files?.length || Array.from(modelsToUpload)?.length) <
          1 ? (
            <h3 className='heading-3'>{t('planInstructions.services')}</h3>
          ) : (
            <h3 className='heading-3'>
              {instruction?.files?.length || modelsToUpload?.length}{' '}
              {t('planInstructions.filesSelected')}
            </h3>
          )}
        </div>
        <div>
          <img
            src={crossGray}
            alt=''
            className='absolute cursor-pointer top-4 right-4 w-[1.125rem] h-[1.125rem]'
            onClick={() => setModelsToUpload([])}
          />
          <img
            src={downloadSky}
            alt=''
            className='absolute bottom-4 cursor-pointer right-4 w-[1.125rem] h-[1.125rem]'
            onClick={() => downloadFile(instruction?.files)}
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
            onChange={changeHandler}
            className='w-full bg-[#F3F4F5]'
            required={true}
          />
          {/* <img src={expandGray} alt='' /> */}
        </div>
      </div>
      <div className='w-full flex justify-center py-[51px]'>
        <SmButton
          style={styles.payBtnStyle}
          variant='medium'
          title='Send'
          onClick={submitHandler}
        />
      </div>
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

export default NewPlanInstructions;
