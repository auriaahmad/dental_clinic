import React, { useEffect, useState } from 'react';
import Table from '../../../components/common/Table';
import { userPlansMockData } from '../../../shared/mock';
import CInput from '../../../components/form/CInput';
import search from '../../../assets/searchRegular.svg';
import { useTranslation } from 'react-i18next';
import SmButton from '../../../components/form/SmButton';
import { useLocation, useNavigate } from 'react-router';
import { getDentistPatientsAPI } from '../../../apis/plansAPI';
import PatientsTable from './components/PatientsTable';
import { useGlobalStore } from '../../../store/store';
import { toast } from 'react-toastify';
import { updateBillingMessageStatusAPI } from '../../../apis/billing';

const UserDashboard = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { loading, user, resetPatient } = useGlobalStore(state => state);
  const navigate = useNavigate();
  const navigateToNewPlan = () => {
    const { address, city, cnif, company, country } = user.billingInformation;
    if (!company || !address || !city || !country) {
      toast.error(t(`billMessages.completeBillingInfo`), { toastId: 1 });
      return navigate('/user/profile');
    }

    navigate('/user/plannings/new-plan');
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const [data, setData] = useState([]);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [latestBilling, setLatestBilling] = useState();

  useEffect(() => {
    if (location.search.replace('?payment=', '') === 'success') {
      if (latestBilling) {
        if (!latestBilling.billingMessageDisplayed) {
          toast(t(`paymentMessages.success`), { toastId: 1 });
          setPaymentSuccessful(true);
          updateBillingMessageStatusAPI(latestBilling._id);
        }
      }
    }
    resetPatient();
  }, [latestBilling]);

  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <h1 className='heading-1'>{t('UserDashboard.planning')}</h1>
      </div>
      <div className='dashboard__filters items-end justify-between'>
        <div className='dashboard__filters__input'>
          {!loading && (
            <CInput
              label={t('UserDashboard.SbP')}
              placeholder={t('UserDashboard.search')}
              icon={search}
              onChange={event => setSearchKeyword(event.target.value)}
            />
          )}
        </div>
        <div>
          <SmButton
            titleComplete={t('userPatientPlans.NP')}
            variant='medium'
            weight='normal'
            onClick={navigateToNewPlan}
            style={{ minHeight: '2.5rem' }}
          />
        </div>
      </div>

      <PatientsTable
        searchKeyword={searchKeyword}
        data={data}
        setData={setData}
        paymentSuccessful={paymentSuccessful}
        latestBilling={latestBilling}
        setLatestBilling={setLatestBilling}
      />
      <div className='mb-[30px]'></div>
    </div>
  );
};

export default UserDashboard;
