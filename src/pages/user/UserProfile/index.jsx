import backArrowCircle from '../../../assets/backArrowCircle.svg';
import ATMCard from './components/ATMCard';
import ProfileForm from './components/ProfileForm';
import { useTranslation } from 'react-i18next';

const UserProfile = () => {
  const { t } = useTranslation();

  return (
    <div className='profile'>
      <div className='mt-[10px]'>
        <ProfileForm />
      </div>
      {/* <div className='flex flex-col w-full '>
        <h2 className='heading-2 mt-8 mb-[20px]'>
          {t('userProfile.metdoeDe')}
        </h2>

        <div className='w-full flex gap-4 flex-wrap max-w-[875px] mt-[4px]'>
          <ATMCard />
          <ATMCard />
          <ATMCard />
          <ATMCard />
        </div>
      </div> */}
      <div className='mb-[30px]'></div>
    </div>
  );
};

export default UserProfile;
