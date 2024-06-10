import backArrowCircle from '../../../assets/backArrowCircle.svg';
import cameraGray from '../../../assets/cameraGray.svg';
import uploadSky from '../../../assets/upload.png';
import downloadSky from '../../../assets/downloadSky.svg';
import crossGray from '../../../assets/crossGray.svg';
import PlanCard from '../../../components/common/PlanCard';
import FWButton from '../../../components/form/FWButton';
import CInput from '../../../components/form/CInput';
import SmButton from '../../../components/form/SmButton';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../../hooks/useHelpers';
import { toast } from 'react-toastify';
import { getPreSignedURLAPI, uploadToS3 } from '../../../apis/uploadAPIs';
import {
  createPatientAPI,
  createPlanDraftAPI,
  createUpdatePlanDraftAPI,
  deletePlanDraftAPI,
  getPlanDraftByIDAPI,
} from '../../../apis/plansAPI';
import { lang } from '../../../shared/languages/lang';
import { useGlobalStore } from '../../../store/store';
import { getPricingProductsForDentistAPI } from '../../../apis/pricingAPIs';
import { AppContext } from '../../../App';
import { useLocation } from 'react-router';
import {
  cancelCheckoutSession,
  createCheckoutSession,
} from '../../../apis/paymentAPI';
import useScreenSize from '../../../hooks/useResize';

const NewPlan = () => {
  const { t } = useTranslation();
  const {
    lang: language,
    setLoading,
    user,
    sessionID,
    patient,
    setPatient,
    setSessionID,
  } = useGlobalStore(state => state);
  const location = useLocation();

  const patientImageRef = useRef();
  const modelsToUploadRef = useRef();
  const modelsToUploadFilesRef = useRef();
  const patientRef = useRef();
  const draftRef = useRef();
  const stopDraftRef = useRef();
  const proceedToPaymentRef = useRef();
  const sessionRef = useRef();

  const { navigateToPage } = useHelpers();

  const { width: screenSize } = useScreenSize();

  const [uploading, setUploading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [selectedComplementaryProduct, setSelectedComplementaryProduct] =
    useState();
  const [imageToUpload, setImageToUpload] = useState();
  const [modelsToUpload, setModelsToUpload] = useState();

  const [products, setProducts] = useState([]);
  const [complimentaryProducts, setComplimentaryProducts] = useState([]);

  let _draft = '';
  if (location.search.includes('draft'))
    _draft = location.search.replace('?draft=', '');

  useEffect(() => {
    const getProducts = async () => {
      const response = await getPricingProductsForDentistAPI();
      if (response) {
        setProducts(response.products);
        setComplimentaryProducts(response.complementaryProducts);
        setSelectedPlan();
        if (patient._complementaryProduct) setSelectedComplementaryProduct();
      }
      setLoading(false);
    };

    const getDraftPlanningByID = async () => {
      setLoading(true);

      if (_draft) {
        draftRef.current = _draft;
        const response = await getPlanDraftByIDAPI(_draft);
        if (response) {
          const {
            patientName,
            patientImage,
            patientDOB,
            instructions,
            _product,
            _complimentaryProduct,
            files,
          } = response.draftPlanning;

          setPatient({
            name: patientName,
            patientImage,
            dob: patientDOB,
            instructions,
            _product,
            _complementaryProduct: _complimentaryProduct,
            files: files || [],
          });
        }
      }
    };

    getDraftPlanningByID()
      .then(() => {
        return getProducts();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const { address, city, cnif, company, country } = user.billingInformation;
    if (!company || !address || !city || !country) {
      toast.error(t(`billMessages.completeBillingInfo`), { toastId: 1 });
      return navigateToPage('/user/profile');
    }
  }, []);

  const changeHandler = async event => {
    try {
      const { name, value, files } = event.target;
      if (name === 'patientImage') {
        setUploading(true);
        setImageToUpload(files[0]);

        const splittedFileName = files[0].name.split('/');
        let fileType = splittedFileName[splittedFileName.length - 1];
        let fileName = files[0].name.replace(`.${fileType}`, '');
        const { url: imagePreSignedURL } = await getPreSignedURLAPI({
          type: files[0].type,
          fileName,
        });
        const s3Response = await uploadToS3(imagePreSignedURL, files[0]);
        if (s3Response)
          patient.patientImage = s3Response?.config?.url?.split('?')[0];

        setImageToUpload();

        return setPatient({
          ...patient,
        });
      } else if (name === 'files') {
        setUploading(true);
        patient.files = [];
        setPatient({
          ...patient,
        });

        setModelsToUpload([...Array.from(files)]);

        let filesTU = Array.from(files);
        for (let i = 0; i < filesTU?.length; i++) {
          const splittedFileName = filesTU[i].name.split('/');
          let fileType = splittedFileName[splittedFileName.length - 1];
          let fileName = filesTU[i].name.replace(`.${fileType}`, '');

          const { url: modelsToUploadPreSignedURL } = await getPreSignedURLAPI({
            type: filesTU[i].type,
            fileName,
          });
          const s3Response = await uploadToS3(
            modelsToUploadPreSignedURL,
            files[i]
          );

          if (modelsToUploadFilesRef.current?.length > 0) {
            patient.files[i] = s3Response?.config?.url?.split('?')[0];
            setPatient({
              ...patient,
            });
          }
        }
        setModelsToUpload([]);
        return;
      }

      patient[name] = value;
      setPatient({ ...patient });
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };
  console.log(patient, '<--');
  useEffect(() => {
    modelsToUploadFilesRef.current = modelsToUpload;
  }, [modelsToUpload]);

  const selectProfileImage = async () => patientImageRef.current.click();
  const selectModels = async () => modelsToUploadRef.current.click();

  const submitHandler = async (event, paymentPending) => {
    event?.preventDefault();

    if (!patient.instructions) {
      return toast.error(
        language === 'en'
          ? 'You must write some instructions for the case.'
          : 'Debes escribir alguna instrucción para el caso',
        { toastId: 1 }
      );
    } else if (!patient.name) {
      return toast.error(
        language === 'en'
          ? 'You must write patient name!'
          : '¡Debe escribir el nombre del paciente!',
        { toastId: 1 }
      );
    } else if (!patient.dob) {
      return toast.error(
        language === 'en'
          ? "You must write patient's date of birth!"
          : '¡Debe escribir la fecha de nacimiento del paciente!',
        { toastId: 1 }
      );
    } else if (!patient._product)
      return toast.error(
        language === 'es'
          ? '¡Debes seleccionar un producto!'
          : 'You must select a product!',
        { toastId: 1 }
      );

    if (uploading)
      return toast.error(
        language === 'en'
          ? 'Uploading files please wait!'
          : 'Subiendo archivos ¡espera!',
        { toastId: 1 }
      );

    const response = await createCheckoutSession({
      ...patient,
      _product: patient._product,
      _complementaryProduct: patient._complementaryProduct,
      status: !paymentPending ? 'Waiting for planning' : 'Pending payment',
      _draft: draftRef.current,
    });
    proceedToPaymentRef.current = true;
    setSessionID(response.session.id);
    window.location.replace(response.session.url);

    return;
    try {
      setLoading(true);

      setPatient({ ...patient });
      const response = await createPatientAPI({
        ...patient,
        _product: patient._product,
        _complementaryProduct: patient._complementaryProduct,
        status: !paymentPending ? 'Waiting for planning' : 'Pending payment',
        _draft: draftRef.current,
      });
      if (response) {
        toast(lang[language], { toastId: 1 });
        stopDraftRef.current = true;
        navigateToPage('/user/plannings');
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = files => {
    let filesToDownload = uploading ? modelsToUpload : files;
    if (!filesToDownload || filesToDownload.length < 1) return;

    filesToDownload.forEach(url =>
      window.open(uploading ? URL.createObjectURL(url) : url, '_blank')
    );
  };

  const planInProgress = () => {
    return !!(
      patientRef.current?.name ||
      patientRef.current?.patientImage ||
      patientRef.current?.dob ||
      patientRef.current?.instructions ||
      patientRef.current?.files?.length > 0
    );
  };

  useEffect(() => {
    patientRef.current = patient;
  }, [patient]);

  useEffect(() => {
    sessionRef.current = sessionID;
  }, [sessionID]);

  const addPlanningToDraft = useCallback(async () => {
    if (!planInProgress() || stopDraftRef.current || sessionRef.current) return;

    await createUpdatePlanDraftAPI({
      patientName: patientRef.current.name,
      patientImage: patientRef.current.patientImage,
      patientDOB: patientRef.current.dob,
      instructions: patientRef.current.instructions,
      files: patientRef.current.files,
      _product: patientRef.current._product,
      _complimentaryProduct: patientRef.current._complementaryProduct,
      _draft: draftRef.current,
    });
    setPatient({
      name: '',
      patientImage: null,
      dob: '',
      instructions: '',
      _product: '',
      _complementaryProduct: '',
      files: [],
    });
  }, []);

  useEffect(() => {
    return async () => {
      // Save Unsaved planning to backend
      await addPlanningToDraft();
    };
  }, [addPlanningToDraft]);

  const deleteDraft = async () => {
    const confirm = window.confirm(
      language === 'es' ? 'Estas seguro' : 'Are you sure?'
    );
    if (!confirm) return;
    const response = await deletePlanDraftAPI(draftRef.current);
    if (response) {
      stopDraftRef.current = true;
      navigateToPage('/user/plannings');
    }
  };

  useEffect(() => {
    if (sessionID) {
      cancelCheckoutSession({ sessionID });
      setSessionID();
    }
  }, []);

  return (
    <form className='patientPlans changePlan' onSubmit={submitHandler}>
      <input
        type='file'
        name='patientImage'
        accept='image/*'
        onChange={event => changeHandler(event)}
        className='hidden'
        ref={patientImageRef}
      />
      <input
        type='file'
        name='files'
        onChange={event => changeHandler(event)}
        className='hidden'
        ref={modelsToUploadRef}
        multiple
      />
      <div className='patientPlans__header flex gap-4 items-center'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => {
            navigateToPage('/user/plannings');
          }}
        />

        <h2 className='heading-2'>{t('newPlan.New Planning')}</h2>
      </div>
      {_draft && (
        <div className='flex w-full justify-end -mb-2'>
          <SmButton
            variant='medium'
            theme='danger'
            title='Delete'
            type='button'
            onClick={deleteDraft}
          />
        </div>
      )}
      <div
        className='patientPlans__nav'
        style={
          screenSize < 450
            ? { display: 'flex', flexFlow: 'column', alignItems: 'center' }
            : {}
        }
      >
        <div className='patientPlans__nav__summaries'>
          <div
            className='patientPlans__nav__summary gap-3'
            style={
              screenSize < 450 ? { width: '100%', alignItems: 'center' } : {}
            }
          >
            <div
              className='patientPlans__nav__summary__item'
              style={screenSize < 450 ? { width: '300px' } : {}}
            >
              <label className='w-[95px]'>
                {t('patientPlanTreatments.patient')}:
              </label>
              <CInput
                style={{ maxWidth: '217px', height: '35px' }}
                name='name'
                id='name'
                onChange={changeHandler}
                required={true}
                value={patient.name}
              />
            </div>
            <div
              className='patientPlans__nav__summary__item'
              style={screenSize < 450 ? { width: '300px' } : {}}
            >
              <label className='w-[95px]'>{t('newPlan.BirthDate')}:</label>
              <CInput
                style={{ maxWidth: '217px', height: '35px' }}
                type='date'
                name='dob'
                id='dob'
                onChange={changeHandler}
                required={true}
                value={patient.dob}
              />
            </div>
          </div>
        </div>
        <div
          className='w-[90px] h-[90px] rounded-full overflow-hidden flex items-center justify-center patientImage'
          style={{
            boxShadow: '0px 4px 40px 0px #0000001A',
          }}
        >
          {!patient.patientImage && !imageToUpload ? (
            <div>
              <img src={cameraGray} alt='' onClick={selectProfileImage} />
            </div>
          ) : (
            <div className='relative'>
              <img
                src={
                  imageToUpload
                    ? URL.createObjectURL(imageToUpload)
                    : patient.patientImage
                }
                alt=''
              />
              <div className='absolute top-0 left-0 flex items-center justify-center gap-2 w-full h-full bg-[rgba(255,255,255,0.5)] patientImage__overlay'>
                {(patient?.patientImage || imageToUpload) && (
                  <i
                    className='fa-solid fa-trash text-[red]'
                    onClick={() => {
                      patient.patientImage = null;
                      setPatient({ ...patient });
                      setImageToUpload();
                    }}
                  ></i>
                )}
                <i
                  className='fa-solid fa-upload text-[#00B0F0]'
                  onClick={selectProfileImage}
                ></i>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='changePlan__files shadow-container flex'>
        <div
          className='flex justify-center items-center flex-1  max-w-[80%] cursor-pointer'
          onClick={selectModels}
        >
          <h3 className='heading-3 '>
            {modelsToUpload?.length > 0 || patient.files?.length > 0
              ? `${
                  patient?.files?.length > 0
                    ? patient?.files?.length
                    : modelsToUpload?.length
                } ${t('newPlan.selectedFiles')}`
              : t('newPlan.services')}
          </h3>
        </div>
        <img
          src={crossGray}
          alt=''
          className='absolute cursor-pointer top-4 right-4 w-[1.125rem] h-[1.125rem]'
          onClick={() => {
            setModelsToUpload([]);
            patient.files = [];
            setPatient({ ...patient });
          }}
        />
        <img
          src={downloadSky}
          alt=''
          className='absolute bottom-4 cursor-pointer right-4 w-[1.125rem] h-[1.125rem]'
          onClick={() => downloadFile(patient.files)}
        />
      </div>

      <div className='changePlan__writtenInsts '>
        <h2 className='text-[24px] text-grayish'>{t('newPlan.WI')}</h2>
        <div className='shadow-container changePlan__writtenInsts__instructs'>
          <textarea
            id=''
            cols='30'
            rows='5'
            name='instructions'
            onChange={changeHandler}
            className='w-full bg-[#F3F4F5]'
            required={true}
            value={patient.instructions}
          />
          {/* <img src={expandGray} alt='' /> */}
        </div>
      </div>

      <div className='changePlan__plans'>
        <h2 className='text-[24px] text-grayish'>{t('newPlan.CP')}</h2>
        <div
          className='changePlan__plans__plans'
          style={
            screenSize < 450
              ? {
                  width: '100%',
                  justifyContent: 'center',
                }
              : {}
          }
        >
          {products.map(product => (
            <PlanCard
              selected={patient._product}
              id={product._id}
              setSelected={id => {
                patient._product = id;
                setPatient({ ...patient });
              }}
              product={product}
              key={product._id}
            />
          ))}
        </div>
      </div>

      <div className='changePlan__note'>
        <span>{t('newPlan.Note')}</span>
      </div>

      {complimentaryProducts.map(cProduct => (
        <div className='mb-4'>
          <FWButton
            title={`${cProduct.product}: ${cProduct.price}€`}
            variant='whiteSky'
            type='button'
            key={cProduct.key}
            style={
              patient._complementaryProduct === cProduct._id
                ? { background: '#F1FBFF', border: '1px solid #00B0F0' }
                : {}
            }
            onClick={() => {
              if (patient._complementaryProduct)
                patient._complementaryProduct = null;
              else patient._complementaryProduct = cProduct._id;
              setPatient({ ...patient });
            }}
          />
        </div>
      ))}

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

export default NewPlan;
