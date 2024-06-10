import React, { useState } from 'react';
import Table from '../../../components/common/Table';
import { userBillingMockData } from '../../../shared/mock';
import CInput from '../../../components/form/CInput';
import search from '../../../assets/searchRegular.svg';
import { useTranslation } from 'react-i18next';
import BillingTable from './components/BillingTable';

const UserBilling = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [patientSearchKeyword, setPatientSearchKeyword] = useState('');
  return (
    <div className='billing'>
      <div className='billing__container'>
        <div className='billing__container__header'>
          <h1>{t('userBilling.bills')}</h1>
        </div>
      </div>
      <div className='billing__filters'>
        <div className='billing__filters__inputContainer'>
          <div className='billing__filters__inputContainer__input'>
            <CInput
              label={t(`UserDashboard.SbP`)}
              placeholder={t('userBilling.search')}
              icon={search}
              onChange={e => setPatientSearchKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <BillingTable
        data={data}
        setData={setData}
        patientSearchKeyword={patientSearchKeyword}
      />
    </div>
  );
};

export default UserBilling;
