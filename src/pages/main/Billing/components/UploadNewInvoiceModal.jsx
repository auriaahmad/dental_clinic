import { useTranslation } from 'react-i18next';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import SmButton from '../../../../components/form/SmButton';
import FWButton from '../../../../components/form/FWButton';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createManualInvoiceForCompanyAPI,
  searchItemsForCompanyAPI,
  searchUsersForCompanyAPI,
  uploadInvoiceForCompanyAPI,
} from '../../../../apis/billing';
import { toast } from 'react-toastify';
import { useGlobalStore } from '../../../../store/store';
import search from '../../../../assets/searchRegular.svg';
import useScreenSize from '../../../../hooks/useResize';
import { Popover } from '@headlessui/react';
import useClickAway from '../../../../hooks/useClickaway';
import SearchableDropDown from '../../../../components/common/SearchableDropDown';
import Loading from '../../../../components/common/Loading';

const UploadNewInvoiceModal = ({ open, handleClose, setData }) => {
  const { t } = useTranslation();

  const { setLoading, loading } = useGlobalStore(state => state);

  const [userSearchKeyword, setUserSearchKeyword] = useState('');
  const [patientSearchKeyword, setPatientSearchKeyword] = useState('');
  const [productsSearchKeyword, setProductsSearchKeyword] = useState('');
  const [planSearchKeyword, setPlanSearchKeyword] = useState('');

  const [selectedUser, setSelectedUser] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedPlan, setSelectedPlan] = useState();

  const [usersResult, setUsersResult] = useState([]);
  const [patientsResult, setPatientsResult] = useState([]);
  const [productsResult, setProductsResult] = useState([]);
  const [planningsResult, setPlanningsResult] = useState([]);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [comment, setComment] = useState();
  const [payable, setPayable] = useState();

  const submitHandler = async event => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await createManualInvoiceForCompanyAPI({
        price,
        discount,
        comment,
        user: selectedUser?._id,
        product: selectedProduct?._id,
        planning: selectedPlan?._id,
        patient: selectedPatient?._id,
      });

      setData(pS => [response.invoice, ...pS]);
      setDefaultFormState();
      handleClose();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // const submitHandler = async event => {
  //   event.preventDefault();
  //   if (!invoice || !selectedUser)
  //     return toast.error(t('general.fillTheFormCorrectly'));
  //   setLoading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append('dentist', selectedUser._id);
  //     formData.append('invoice', invoice, invoice.name);

  //     const response = await uploadInvoiceForCompanyAPI(formData);
  //     if (response) {
  //       setData(pS => [response.data.invoice, ...pS]);
  //       toast(t('messages.success'));
  //     }
  //     setInvoice();
  //     handleClose();
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const setDefaultFormState = () => {
    setPrice();
    setDiscount();
    setComment();
    setSelectedPatient();
    setSelectedPlan();
    setSelectedProduct();
    setSelectedUser();
    setPatientsResult([]);
    setUsersResult([]);
    setProductsResult([]);
    setPlanningsResult([]);
  };

  const searchItems = async (type, searchKeyword, setItemsResult, item) => {
    const response = await searchItemsForCompanyAPI({
      searchKeyword,
      type,
      skip: 0,
      limit: 10,
      item: item?._id,
    });

    console.log(response.items);
    setItemsResult([...response.items]);
  };

  useEffect(() => {
    if (userSearchKeyword)
      searchItems('user', userSearchKeyword, setUsersResult);
  }, [userSearchKeyword]);

  useEffect(() => {
    if (patientSearchKeyword)
      searchItems('patient', patientSearchKeyword, setPatientsResult);
  }, [patientSearchKeyword]);

  useEffect(() => {
    if (productsSearchKeyword)
      searchItems('product', productsSearchKeyword, setProductsResult);
  }, [productsSearchKeyword]);

  useEffect(() => {
    if (planSearchKeyword)
      searchItems('plan', planSearchKeyword, setPlanningsResult, selectedUser);
  }, [planSearchKeyword]);

  return (
    <Modal open={open} onClose={handleClose} style={{ maxWidth: '600px' }}>
      <div className='modal flex flex-col gap-[2.75rem]'>
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2>{t('uploadNewInvoice.heading')}</h2>
            <form onSubmit={submitHandler}>
              <div className='w-full flex sm:flex-row flex-col gap-2 flex-wrap'>
                <SearchableDropDown
                  filteredData={usersResult}
                  onChange={event => {
                    setSelectedUser();
                    setSelectedPlan();
                    setUserSearchKeyword(event.target.value);
                  }}
                  searchKeyword={userSearchKeyword}
                  selectedItem={selectedUser}
                  setSelectedItem={setSelectedUser}
                  setSearchKeyword={setUserSearchKeyword}
                  label={t('patientPlans.U')}
                  placeholder={t('patientPlans.U')}
                />
                <SearchableDropDown
                  filteredData={patientsResult}
                  onChange={event => {
                    setSelectedPatient();
                    setPatientSearchKeyword(event.target.value);
                  }}
                  searchKeyword={patientSearchKeyword}
                  selectedItem={selectedPatient}
                  setSelectedItem={setSelectedPatient}
                  setSearchKeyword={setPatientSearchKeyword}
                  label={t('patientPlans.P')}
                  placeholder={t('patientPlans.P')}
                />

                <SearchableDropDown
                  filteredData={productsResult}
                  onChange={event => {
                    setSelectedProduct();
                    setProductsSearchKeyword(event.target.value);
                  }}
                  searchKeyword={productsSearchKeyword}
                  selectedItem={selectedProduct}
                  setSelectedItem={setSelectedProduct}
                  setSearchKeyword={setProductsSearchKeyword}
                  label={t('prices.Product')}
                  placeholder={t('prices.Product')}
                />

                <SearchableDropDown
                  filteredData={planningsResult}
                  onChange={event => {
                    setSelectedPlan();
                    setPlanSearchKeyword(event.target.value);
                  }}
                  searchKeyword={planSearchKeyword}
                  selectedItem={selectedPlan}
                  setSelectedItem={setSelectedPlan}
                  setSearchKeyword={setPlanSearchKeyword}
                  label={t('UserDashboard.planning')}
                  placeholder={t('userBilling.Search by Planning Number')}
                />

                <CInput
                  type='number'
                  label={t('userBilling.price')}
                  placeholder={t('userBilling.price')}
                  style={{ width: '100%' }}
                  onChange={event => setPrice(event.target.value)}
                />

                <CInput
                  type='number'
                  label={t('userBilling.discount')}
                  placeholder={t('userBilling.discount')}
                  style={{ width: '100%' }}
                  onChange={event => setDiscount(event.target.value)}
                />

                <CInput
                  variant='textarea'
                  label={t('userBilling.comment')}
                  placeholder={t('userBilling.comment')}
                  style={{ width: '100%' }}
                  onChange={event => setComment(event.target.value)}
                />

                {/* <input
              type='file'
              accept='application/pdf'
              onChange={changeHandler}
              style={{ display: 'none' }}
              ref={fileRef}
            />
            <div className=' flex flex-col gap-2 sm:gap-3 m-0'>
              <label className='text-[0.8rem] text-grayish'>
                {t('UploadPlanModal.UF')}
              </label>

              <SmButton
                theme='white'
                titleComplete={
                  invoice ? invoice.name : t('buttons.Browse File')
                }
                variant='medium'
                style={{
                  width: screenWidth > 640 ? '10rem' : '100%',
                  height: screenWidth > 1200 ? '3rem' : '2.5rem',
                }}
                type='button'
                onClick={() => fileRef.current.click()}
              />
            </div> */}
              </div>
              <div className='flex justify-center'>
                <div className='max-w-[300px] w-full mt-5'>
                  <FWButton title={t('UploadPlanModal.U')} variant='theme' />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UploadNewInvoiceModal;
