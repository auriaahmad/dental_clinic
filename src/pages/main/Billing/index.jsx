import React, { useState } from 'react';
import Table from '../../../components/common/Table';
import { billingMockData } from '../../../shared/mock';
import CInput from '../../../components/form/CInput';
import FWButton from '../../../components/form/FWButton';
import search from '../../../assets/searchRegular.svg';
import { useTranslation } from 'react-i18next';
import UploadNewInvoiceModal from './components/UploadNewInvoiceModal';
import BillingTable from './components/BillingTable';

const Billing = () => {
  const { t } = useTranslation();
  const [newInvoiceModalOpen, setNewQueryModalOpen] = useState(false);
  const handleCloseModal = () => setNewQueryModalOpen(false);

  const [data, setData] = useState([]);
  const [userSearchKeyword, setUserSearchKeyword] = useState('');
  const [patientSearchKeyword, setPatientSearchKeyword] = useState('');

  return (
    <div className='billing'>
      <div className='billing__container'>
        <div className='billing__container__header'>
          <h1>{t('billing.bills')}</h1>
        </div>
      </div>
      <div className='billing__filters'>
        <div className='billing__filters__inputContainer'>
          <div className='billing__filters__inputContainer__input'>
            <CInput
              label={t('billing.searchByUser')}
              placeholder={t('billing.searchUserButton')}
              icon={search}
              onChange={e => setUserSearchKeyword(e.target.value)}
            />
          </div>
          <div className='billing__filters__inputContainer__input'>
            <CInput
              label={t('billing.searchByPatient')}
              placeholder={t('billing.searchUserButton')}
              icon={search}
              onChange={e => setPatientSearchKeyword(e.target.value)}
            />
          </div>
        </div>

        <div className='billing__filters__button'>
          <FWButton
            title={t('billing.uploadNewInvoice')}
            variant='theme'
            onClick={() => setNewQueryModalOpen(true)}
          />
        </div>
      </div>

      <BillingTable
        data={data}
        setData={setData}
        userSearchKeyword={userSearchKeyword}
        patientSearchKeyword={patientSearchKeyword}
      />
      <UploadNewInvoiceModal
        open={newInvoiceModalOpen}
        handleClose={handleCloseModal}
        setData={setData}
      />
    </div>
  );
};

export default Billing;
