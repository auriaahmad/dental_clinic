import React, { useState } from 'react';
import CInput from '../../../components/form/CInput';
import search from '../../../assets/searchRegular.svg';
import { useTranslation } from 'react-i18next';
import PlansTable from './components/PlansTable';

const Dashboard = () => {
  const { t } = useTranslation();
  const [userSearchKeyword, setUserSearchKeyword] = useState('');
  const [patientSearchKeyword, setPatientSearchKeyword] = useState('');

  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <h1 className='heading-1'>{t('planning.plan')}</h1>
      </div>
      <div className='dashboard__filters'>
        <div className='dashboard__filters__input'>
          <CInput
            label={t('planning.searchByUser')}
            placeholder={t('planning.searchUserButton')}
            icon={search}
            onChange={e => setUserSearchKeyword(e.target.value)}
          />
        </div>
        <div className='dashboard__filters__input'>
          <CInput
            label={t('planning.searchByPatient')}
            placeholder={t('planning.searchUserButton')}
            icon={search}
            onChange={e => setPatientSearchKeyword(e.target.value)}
          />
        </div>
      </div>
      <PlansTable
        userSearchKeyword={userSearchKeyword}
        patientSearchKeyword={patientSearchKeyword}
      />
    </div>
  );
};

export default Dashboard;
