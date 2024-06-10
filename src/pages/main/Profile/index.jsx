import { useMemo, useState } from 'react';
import backArrowCircle from '../../../assets/backArrowCircle.svg';
import SmButton from '../../../components/form/SmButton';
import ATMCard from './components/ATMCard';
import ProfileForm from './components/ProfileForm';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import {
  deleteUserForCompanyAPI,
  toggleBlockUserForCompanyAPI,
} from '../../../apis/userAPIs';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const _user = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  const [user, setUser] = useState([]);

  const toggleBlockStatus = async () => {
    const response = await toggleBlockUserForCompanyAPI(_user);
    if (response) {
      setUser(response.user);
    }
  };

  const deleteUser = async () => {
    const confirm = window.confirm(t(`gen.userDeletionConfirmation`));
    if (!confirm) return;
    const response = await deleteUserForCompanyAPI(_user);
    if (response) {
      navigate('/company/users');
    }
  };

  return (
    <div className='profile'>
      <div className='profile__header'>
        <img
          src={backArrowCircle}
          alt=''
          onClick={() => navigate('/company/users')}
        />
      </div>

      <div className='profile__nav'>
        <SmButton
          variant='medium'
          theme='primary'
          title={user?.isActive ? 'Block User' : 'Unblock User'}
          onClick={toggleBlockStatus}
        />
        <SmButton
          variant='medium'
          theme='danger'
          title='Borren User'
          onClick={deleteUser}
        />
      </div>

      <ProfileForm _user={_user} user={user} setUser={setUser} />

      {/* <div className='flex flex-col w-full'>
        <h2 className='heading-2 mt-8 mb-[20px]'>{t('profile.Note')}</h2>

        <div className='w-full flex gap-4 flex-wrap max-w-[875px] mt-[4px]'>
          <ATMCard />
          <ATMCard />
          <ATMCard />
          <ATMCard />
        </div>
      </div> */}
      <div className='mb-6'></div>
    </div>
  );
};

export default Profile;
