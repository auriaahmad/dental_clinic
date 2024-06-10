import { useRef, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import CMenu from '../../../../components/form/CMenu';
import FWButton from '../../../../components/form/FWButton';
import SmButton from '../../../../components/form/SmButton';
import { planStatus2, planStatuses } from '../../../../shared/variables';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getPreSignedURLAPI, uploadToS3 } from '../../../../apis/uploadAPIs';
import { addTreatmentPlanForCompanyAPI } from '../../../../apis/plansAPI';
import { useGlobalStore } from '../../../../store/store';
import Loading from '../../../../components/common/Loading';
import useScreenSize from '../../../../hooks/useResize';

const UploadPlanModal = ({
  open,
  handleClose,
  setPlan,
  _plan,
  setInstructions,
  instructions,
  treatmentsCount,
}) => {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status1, setStatus1] = useState('');
  const [status2, setStatus2] = useState('');
  const [copyLink, setCopyLink] = useState('');
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState(true);
  const [notificationConfirmation, setNotificationConfirmation] =
    useState(true);
  const [file, setFile] = useState();
  const { t } = useTranslation();

  const { width: screenWidth } = useScreenSize();

  const submitHandler = async event => {
    event.preventDefault();
    if (!status1 && !status2 && !copyLink && !file)
      return toast.error(t('general.fillTheFormCorrectly'), { toastId: 1 });

    try {
      // return console.log(file);
      setLoading(true);
      let treatmentFile;

      if (file) {
        let fileName = file.name;

        const { url: filePreSignedURL } = await getPreSignedURLAPI({
          type: file.type,
          fileName,
        });
        const s3Response = await uploadToS3(filePreSignedURL, file);
        if (s3Response) treatmentFile = s3Response?.config?.url?.split('?')[0];
      }
      const response = await addTreatmentPlanForCompanyAPI({
        _plan,
        treatmentFile,
        planningStatus: status1,
        changeStatus2: status2,
        copyLink,
        sendConfirmationEmail,
        notificationConfirmation,
      });
      if (response) {
        if (response.instruction) {
          const treatments = instructions.filter(
            item => item.insType === 'treatment'
          );
          setInstructions(pS => [
            {
              ...response.instruction,
              insType: 'treatment',
              index: treatments.length + 1,
            },
            ...pS,
          ]);
        }

        setStatus1();
        setStatus2();
        setFile();
        setCopyLink('');
        setPlan(pS => ({
          ...pS,
          status: status1,
        }));
        handleClose();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const emailConfirmationChange = e => {
    setSendConfirmationEmail(e.target.value === '1' ? true : false);
  };

  const notificationConfirmationChange = e => {
    setNotificationConfirmation(e.target.value === '1' ? true : false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {loading && <Loading />}
      <div className='modal'>
        <h2>{t('UploadPlanModal.treatmentPlan')}</h2>
        <form onSubmit={submitHandler}>
          <div className='flex gap-[1rem] flex-col sm:flex-row mt-[20px] sm:gap-4 sm:mt-[44px]'>
            <CMenu
              style={{ maxWidth: screenWidth < 640 ? '100%' : '48%' }}
              value={status1}
              setValue={setStatus1}
              label={t('UploadPlanModal.CS')}
              options={planStatuses}
              translation='planningStatuses'
            />

            <CInput
              label={t('UploadPlanModal.CL')}
              name='copyLink'
              onChange={e => setCopyLink(e.target.value)}
            />
          </div>
          <div className='flex gap-[1rem] flex-col sm:flex-row mt-[20px] sm:gap-4 sm:mt-[44px]'>
            <CMenu
              style={{ maxWidth: screenWidth < 640 ? '100%' : '48%' }}
              value={status2}
              setValue={setStatus2}
              label={t('UploadPlanModal.CS2')}
              options={planStatus2}
              translation='status2Option'
            />

            <div className='flex flex-col gap-3'>
              <label className='text-[0.8rem] text-grayish'>
                {t('UploadPlanModal.UF')}
              </label>
              <SmButton
                theme='white'
                title={'Browse File'}
                titleComplete={file && file.name}
                variant='medium'
                type='button'
                onClick={() => fileRef.current.click()}
                style={{
                  maxHeight: screenWidth < 640 ? '5rem' : '4rem',
                  overflow: 'hidden',
                  height: screenWidth < 640 ? '2.5rem' : 'auto',
                  maxWidth: screenWidth < 640 ? '100%' : '12rem',
                }}
              />
              <input
                type='file'
                className='hidden'
                accept='application/pdf'
                ref={fileRef}
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className='w-full flex flex-wrap'>
            <div className='flex flex-col mt-5 gap-3 min-w-[50%]'>
              <label className='text-[0.8rem] text-grayish'>
                {t('UploadPlanModal.ConformationEmail')}
              </label>
              <div className='flex gap-5'>
                <div className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='sendConfirmationEmail'
                    id='yes'
                    value={'1'}
                    checked={sendConfirmationEmail === true}
                    required
                    onChange={emailConfirmationChange}
                  />
                  <label htmlFor='yes' className='text-sm cursor-pointer'>
                    {t('UploadPlanModal.Y')}
                  </label>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='sendConfirmationEmail'
                    id='no'
                    value={'2'}
                    checked={sendConfirmationEmail === false}
                    required
                    onChange={emailConfirmationChange}
                  />
                  <label htmlFor='no' className='text-sm cursor-pointer'>
                    {t('UploadPlanModal.N')}
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col mt-5 gap-3'>
              <label className='text-[0.8rem] text-grayish'>
                {t('UploadPlanModal.sendNotification')}
              </label>
              <div className='flex gap-5'>
                <div className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='sendNotification'
                    id='notYes'
                    value={'1'}
                    checked={notificationConfirmation === true}
                    required
                    onChange={notificationConfirmationChange}
                  />
                  <label htmlFor='notYes' className='text-sm cursor-pointer'>
                    {t('UploadPlanModal.Y')}
                  </label>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='sendNotification'
                    id='notNo'
                    value={'2'}
                    checked={notificationConfirmation === false}
                    required
                    onChange={notificationConfirmationChange}
                  />
                  <label htmlFor='notNo' className='text-sm cursor-pointer'>
                    {t('UploadPlanModal.N')}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center mt-[2rem] sm:mt-[2.75rem]'>
            <div className='w-[25rem]'>
              <FWButton title={t('UploadPlanModal.U')} variant='theme' />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UploadPlanModal;
