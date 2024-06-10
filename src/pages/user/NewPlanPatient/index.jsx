import backArrowCircle from '../../../assets/backArrowCircle.svg';
import cameraGray from '../../../assets/cameraGray.svg';
import downloadSky from '../../../assets/downloadSky.svg';
import crossGray from '../../../assets/crossGray.svg';
import PlanCard from '../../../components/common/PlanCard';
import FWButton from '../../../components/form/FWButton';
import SmButton from '../../../components/form/SmButton';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../../hooks/useHelpers';
import { toast } from 'react-toastify';
import { getPreSignedURLAPI, uploadToS3 } from '../../../apis/uploadAPIs';
import {
  createPlanAPI,
  createUpdatePlanDraftAPI,
  deletePlanDraftAPI,
  getPatientByIDAPI,
  getPlanDraftByIDAPI,
} from '../../../apis/plansAPI';
import { lang } from '../../../shared/languages/lang';
import { useGlobalStore } from '../../../store/store';
import { useLocation } from 'react-router';
import { getPricingProductsForDentistAPI } from '../../../apis/pricingAPIs';
import { updatePatientAPI } from '../../../apis/patientAPIs';
import { createCheckoutSession } from '../../../apis/paymentAPI';

const NewPlanPatient = () => {
  const { t } = useTranslation();
  const language = useGlobalStore(state => state.lang);
  const patientImageRef = useRef();
  const modelsToUploadRef = useRef();
  const modelsToUploadFilesRef = useRef();
  const { navigateToPage } = useHelpers();
  const location = useLocation();

  const draftRef = useRef();
  const dataRef = useRef();
  const stopDraftRef = useRef();

  const _patient = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  const { setLoading, newPlan, setPlanForPatient, resetPlanForPatient, user } =
    useGlobalStore(state => state);

  let _draft = '';
  if (location.search.includes('draft'))
    _draft = location.search.replace('?draft=', '');

  const [uploading, setUploading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const [modelsToUpload, setModelsToUpload] = useState([]);
  const [data, setData] = useState({
    instructions: '',
    _product: '',
    files: [],
    _complementaryProduct: '',
  });

  const [patient, setPatient] = useState();

  const [products, setProducts] = useState([]);
  const [complementaryProducts, setComplementaryProducts] = useState([]);

  useEffect(() => {
    const getPatientByID = async () => {
      setLoading(true);
      const [patientRes, productsRes] = await Promise.all([
        getPatientByIDAPI(_patient),
        getPricingProductsForDentistAPI(),
      ]);
      if (patientRes) {
        setPatient(patientRes.patient);
      }
      if (productsRes) {
        setProducts(productsRes.products);
        setComplementaryProducts(productsRes.complementaryProducts);
        setSelectedPlan(productsRes.products?.[0]?._id);
      }
      setLoading(false);
    };

    const getDraftPlanningByID = async () => {
      setLoading(true);

      if (_draft) {
        draftRef.current = _draft;
        const response = await getPlanDraftByIDAPI(_draft);
        if (response) {
          const { instructions, _product, _complimentaryProduct, files } =
            response.draftPlanning;

          setData({
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
        return getPatientByID();
      })
      .finally(() => {
        setLoading(false);
      });

    const { address, city, cnif, company, country } = user.billingInformation;
    if (!company || !address || !city || !country) {
      toast.error(t(`billMessages.completeBillingInfo`), { toastId: 1 });
      return navigateToPage('/user/profile');
    }
  }, []);

  const planInProgress = () => {
    return !!(
      dataRef.current?.instructions || dataRef.current?.files?.length > 0
    );
  };

  useEffect(() => {
    dataRef.current = { ...data };
  }, [data]);

  console.log(data.instructions, '->>>>');

  const addPlanningToDraft = useCallback(async () => {
    if (!planInProgress() || stopDraftRef.current) return;
    await createUpdatePlanDraftAPI({
      patientName: dataRef.patientName,
      instructions: dataRef.current.instructions,
      files: dataRef.current.files,
      _patient,
      _product: dataRef.current._product,
      _complimentaryProduct: dataRef.current._complementaryProduct,
      _draft: draftRef.current,
    });
  }, []);

  useEffect(() => {
    return async () => {
      // Save Unsaved planning to backend
      await addPlanningToDraft();
    };
  }, [addPlanningToDraft]);

  const changeHandler = async event => {
    try {
      const { name, value, files } = event.target;
      if (name === 'imageToUpload') {
        setImageToUpload(files[0]);

        const splittedFileName = files[0].name.split('/');
        let fileType = splittedFileName[splittedFileName.length - 1];
        let fileName = files[0].name.replace(`.${fileType}`, '');

        const { url: imagePreSignedURL } = await getPreSignedURLAPI({
          type: files[0].type,
          fileName,
        });
        const s3Response = await uploadToS3(imagePreSignedURL, files[0]);
        if (s3Response) {
          data.patientImage = s3Response?.config?.url?.split('?')[0];
          setPatient(pS => ({
            ...pS,
            patientImage: s3Response?.config?.url?.split('?')[0],
          }));

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

        setImageToUpload();
        setPlanForPatient({ _patient, plan: data });
        return setData({
          ...data,
        });
      } else if (name === 'files') {
        setUploading(true);
        setModelsToUpload(Array.from(files));
        for (let i = 0; i < files?.length; i++) {
          const splittedFileName = files[i].name.split('/');
          let fileType = splittedFileName[splittedFileName.length - 1];
          let fileName = files[i].name.replace(`.${fileType}`, '');

          const { url: modelsToUploadPreSignedURL } = await getPreSignedURLAPI({
            type: files[i].type,
            fileName,
          });
          const s3Response = await uploadToS3(
            modelsToUploadPreSignedURL,
            files[i]
          );

          if (modelsToUploadFilesRef.current?.length > 0) {
            data.files[i] = s3Response?.config?.url?.split('?')[0];
            setPlanForPatient({ _patient, plan: { ...data, [name]: value } });

            setData({
              ...data,
            });
          }
        }

        setModelsToUpload([]);
        return;
      }

      setData(pS => ({
        ...pS,
        [name]: value,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    modelsToUploadFilesRef.current = modelsToUpload;
  }, [modelsToUpload]);

  const selectProfileImage = async () => patientImageRef.current.click();
  const selectModels = async () => modelsToUploadRef.current.click();

  const submitHandler = async (event, paymentPending) => {
    event?.preventDefault();
    if (!patient) return;
    if (!data.instructions)
      return toast.error(
        language === 'en'
          ? 'You must write some instructions for the case.'
          : 'Debes escribir alguna instrucción para el caso',
        { toastId: 1 }
      );
    else if (!data._product)
      return toast.error(
        language === 'es'
          ? '¡Debes seleccionar un producto!'
          : 'You must select a product!',
        { toastId: 1 }
      );

    window.scrollTo({ top: 0 });

    setLoading(true);
    setData({ ...data });

    const response = await createCheckoutSession({
      ...data,
      _patient,
      status: !paymentPending ? 'Waiting for planning' : 'Pending payment',
      _product: selectedPlan,
      _draft: draftRef.current,
      type: 'plan',
    });

    window.location.replace(response.session.url);

    return;

    // const response = await createPlanAPI({
    //   ...data,
    //   _patient,
    //   status: !paymentPending ? 'Waiting for planning' : 'Pending payment',
    //   _product: selectedPlan,
    //   _draft: draftRef.current,
    // });
    // if (response) {
    //   toast(lang[language]);

    //   stopDraftRef.current = true;
    //   navigateToPage(`/user/plannings/patient-plans/${_patient}`);
    // }
    // setLoading(false);
  };

  const downloadFile = files => {
    let filesToDownload = uploading ? modelsToUpload : files;

    if (!filesToDownload || filesToDownload.length < 1) return;

    filesToDownload.forEach(url =>
      window.open(uploading ? URL.createObjectURL(url) : url, '_blank')
    );
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

  const deleteDraft = async () => {
    const confirm = window.confirm(
      language === 'es' ? 'Estas seguro' : 'Are you sure?'
    );
    if (!confirm) return;
    const response = await deletePlanDraftAPI(draftRef.current);
    if (response) {
      stopDraftRef.current = true;
      navigateToPage(`/user/plannings/patient-plans/${_patient}`);
    }
  };

  return (
    <form
      className='patientPlans changePlan'
      id='patientPlans'
      onSubmit={submitHandler}
    >
      <input
        type='file'
        name='imageToUpload'
        accept='image/*'
        onChange={changeHandler}
        className='hidden'
        ref={patientImageRef}
      />
      <input
        type='file'
        name='files'
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
            navigateToPage(`/user/plannings/patient-plans/${_patient}`)
          }
        />
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
      <div className='patientPlans__nav' style={{ alignItems: 'center' }}>
        <div className='patientPlans__nav__summaries' style={{ width: '50%' }}>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('planInstructions.patient')}:</label>
              <span>{patient?.name}</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t('newPlan.BirthDate')}:</label>
              <span>{patient?.dob}</span>
            </div>
          </div>
        </div>

        <div
          className='flex gap-6 items-center'
          style={{ width: '50%', justifyContent: 'flex-end' }}
        >
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
                  onClick={selectProfileImage}
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
                    onClick={selectProfileImage}
                  ></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='changePlan__files shadow-container flex'>
        <div
          className='flex justify-center items-center flex-1  max-w-[80%] cursor-pointer'
          onClick={selectModels}
        >
          <h3 className='heading-3 '>
            {modelsToUpload?.length > 0 || data?.files?.length > 0
              ? `${
                  data?.files.length > 0
                    ? data?.files.length
                    : modelsToUpload?.length
                } ${t('newPlan.selectedFiles')}`
              : t('newPlan.services')}
            {console.log(data?.files, 'Data')}
            {console.log(modelsToUpload, 'models')}
          </h3>
        </div>
        <img
          src={crossGray}
          alt=''
          className='absolute cursor-pointer top-4 right-4 w-[1.125rem] h-[1.125rem]'
          onClick={() => {
            setModelsToUpload([]);
            data.files = [];
            setData({ ...data });
          }}
        />
        <img
          src={downloadSky}
          alt=''
          className='absolute bottom-4 cursor-pointer right-4 w-[1.125rem] h-[1.125rem]'
          onClick={() => downloadFile(data.files)}
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
            defaultValue={data?.instructions}
          />
          {/* <img src={expandGray} alt='' /> */}
        </div>
      </div>

      <div className='changePlan__plans'>
        <h2 className='text-[24px] text-grayish'>{t('newPlan.CP')}</h2>
        <div className='changePlan__plans__plans'>
          {products.map(product => (
            <PlanCard
              // title={
              //   patient?.products?.find(prod => prod._product === product?._id)
              //     ?.productName
              // }
              selected={data?._product}
              id={product._id}
              setSelected={() => {
                setData(pS => ({
                  ...pS,
                  _product: product._id,
                }));
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

      {complementaryProducts.map(cProduct => (
        <div style={{ marginBottom: '1rem' }}>
          <FWButton
            title={`${cProduct.product}: ${cProduct.price}€`}
            key={cProduct._id}
            variant='whiteSky'
            type='button'
            style={
              data._complementaryProduct === cProduct._id
                ? { background: '#F1FBFF', border: '1px solid #00B0F0' }
                : {}
            }
            onClick={() => {
              setData(pS => ({
                ...pS,
                _complementaryProduct: pS._complementaryProduct
                  ? null
                  : cProduct._id,
              }));
              setPlanForPatient({
                _patient,
                plan: {
                  ...data,
                  _complementaryProduct: data._complementaryProduct
                    ? null
                    : cProduct._id,
                },
              });
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

export default NewPlanPatient;
