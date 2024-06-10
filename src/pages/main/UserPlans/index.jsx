import { useMemo, useState } from 'react';
import backArrowCircle from '../../../assets/backArrowCircle.svg';
import Table from '../../../components/common/Table';
import useHelpers from '../../../hooks/useHelpers';
import { userPlansMockData } from '../../../shared/mock';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import UserPlansTable from './components/PlansTable';

const UserPlans = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { navigateToPage } = useHelpers();

  const _user = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  return (
    <div className='patientPlans'>
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          onClick={() => navigateToPage('/company/users')}
          className='cursor-pointer'
        />
      </div>
      <div className='patientPlans__nav'>
        <div className='patientPlans__nav__summary'>
          <div className='patientPlans__nav__summary__item'>
            <label>{t('userPlans.user')}:</label>
            <span>{user?.name}</span>
          </div>
        </div>
      </div>
      <UserPlansTable
        _user={_user}
        data={data}
        setData={setData}
        setUser={setUser}
      />
    </div>
  );
};

export default UserPlans;
