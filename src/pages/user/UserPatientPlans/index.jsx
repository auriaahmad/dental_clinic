import backArrowCircle from '../../../assets/backArrowCircle.svg';
import cameraGray from '../../../assets/cameraGray.svg';
import Table from '../../../components/common/Table';
import SmButton from '../../../components/form/SmButton';
import { userPatientPlansMockData } from '../../../shared/mock';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../../hooks/useHelpers';
import PlansTable from './components/PlansTable';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { getPreSignedURLAPI, uploadToS3 } from '../../../apis/uploadAPIs';
import { updatePatientAPI } from '../../../apis/patientAPIs';
import { toast } from 'react-toastify';
import { useGlobalStore } from '../../../store/store';
import useScreenSize from '../../../hooks/useResize';
import { updateBillingMessageStatusAPI } from '../../../apis/billing';

const UserPatientPlans = () => {
  const profileRef = useRef();
  const { t } = useTranslation();
  const { lang, user, resetPatient } = useGlobalStore(state => state);
  const location = useLocation();
  const { navigateToPage } = useHelpers();
  const [patient, setPatient] = useState();
  const [imageToUpload, setImageToUpload] = useState();

  const [newPlanAllowed, setNewPlanAllowed] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [latestBilling, setLatestBilling] = useState();

  const _patient = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  useEffect(() => {
    if (location.search.replace('?payment=', '') === 'success') {
      if (latestBilling) {
        if (!latestBilling.billingMessageDisplayed) {
          toast(t(`paymentMessages.success`), { toastId: 1 });
          setPaymentSuccessful(true);
          updateBillingMessageStatusAPI(latestBilling._id);
          resetPatient();
        }
      }
    }
  }, [latestBilling]);

  const updateImage = async image => {
    try {
      const splittedFileName = image.name.split('/');
      let fileType = splittedFileName[splittedFileName.length - 1];
      let fileName = image.name.replace(`.${fileType}`, '');

      const { url: filePreSignedURL } = await getPreSignedURLAPI({
        type: image.type,
        fileName,
      });
      const s3Response = await uploadToS3(filePreSignedURL, image);
      if (s3Response) {
        const response = await updatePatientAPI({
          _patient,
          patientImage: s3Response?.config?.url?.split('?')[0],
        });
        if (response) {
          toast(
            lang === 'es'
              ? '¡Perfil del paciente actualizado exitosamente!'
              : 'Patient profile updated successfully!',
            { toastId: 1 }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProfile = async () => {
    try {
      const response = await updatePatientAPI({
        _patient,
        patientImage: '-',
      });
      if (response) {
        patient.patientImage = null;
        setPatient({ ...patient });
        setImageToUpload();
        toast(
          lang === 'es'
            ? '¡Perfil eliminada exitosamente!'
            : 'Profile deleted successfully!',
          { toastId: 1 }
        );
      }
    } catch (err) {}
  };

  const { width: screenWidth } = useScreenSize();

  const pagePath = [
    t(`pageHistory.Plannings`),
    t(`pageHistory.Patient planning`),
  ];

  return (
    <div className='flex flex-col'>
      <input
        type='file'
        accept='image/*'
        ref={profileRef}
        onChange={event => {
          setImageToUpload(event.target.files[0]);

          updateImage(event.target.files[0]);
        }}
        style={{ display: 'none' }}
      />
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => navigateToPage('/user/plannings')}
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
      <div className='flex mt-8 justify-between items-end mb-6 flex-wrap gap-2'>
        <div className='flex gap-6 items-center'>
          <div
            className='w-[90px] h-[90px] rounded-full overflow-hidden flex items-center justify-center patientImage'
            style={{ boxShadow: '0px 4px 40px 0px #0000001A' }}
          >
            {!patient?.patientImage && !imageToUpload ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={cameraGray}
                  alt=''
                  onClick={() => profileRef.current.click()}
                  style={{ width: '2rem' }}
                />
              </div>
            ) : (
              <div
                className='relative'
                style={{ width: '100%', height: '100%' }}
              >
                <img
                  src={
                    imageToUpload
                      ? URL.createObjectURL(imageToUpload)
                      : patient.patientImage
                  }
                  alt=''
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className='absolute top-0 left-0 flex items-center justify-center gap-2 w-full h-full bg-[rgba(255,255,255,0.5)] patientImage__overlay'>
                  {(patient?.patientImage || imageToUpload) && (
                    <i
                      className='fa-solid fa-trash text-[red]'
                      onClick={deleteProfile}
                    ></i>
                  )}
                  <i
                    className='fa-solid fa-upload text-[#00B0F0]'
                    onClick={() => profileRef.current.click()}
                  ></i>
                </div>
              </div>
            )}
          </div>

          <span className='text-[18px] font-medium'>{patient?.name}</span>
        </div>
        {newPlanAllowed && (
          <div
            style={
              screenWidth < 600
                ? {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }
                : {}
            }
          >
            <SmButton
              titleComplete={t('userPatientPlans.New Planning')}
              variant='medium'
              weight='normal'
              onClick={() => {
                const { address, city, cnif, company, country } =
                  user.billingInformation;
                if (!company || !address || !city || !country) {
                  toast.error(
                    t(`billMessages.completeBillingInfo`, { toastId: 1 })
                  );
                  return navigateToPage('/user/profile');
                }

                navigateToPage(`/user/plannings/new-plan/${_patient}`);
              }}
            />
          </div>
        )}
      </div>
      <PlansTable
        setPatient={setPatient}
        setNewPlanAllowed={setNewPlanAllowed}
        paymentSuccessful={paymentSuccessful}
        latestBilling={latestBilling}
        setLatestBilling={setLatestBilling}
      />
    </div>
  );
};

export default UserPatientPlans;
