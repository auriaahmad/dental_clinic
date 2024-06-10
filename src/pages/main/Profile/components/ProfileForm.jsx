import { useEffect, useState } from 'react';
import CInput from '../../../../components/form/CInput';
import { useTranslation } from 'react-i18next';
import { getUserByIDForCompanyAPI } from '../../../../apis/userAPIs';
import { useGlobalStore } from '../../../../store/store';

const ProfileForm = ({ _user, user, setUser }) => {
  const setLoading = useGlobalStore(state => state.setLoading);
  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      const response = await getUserByIDForCompanyAPI(_user);
      if (response) {
        setUser(response.user);
      }

      setLoading(false);
    };
    getUserProfile();
  }, []);

  const submitHandler = event => {
    event.preventDefault();
  };
  const { t } = useTranslation();

  return (
    <form
      className='max-w-[750px] w-full flex flex-col'
      onSubmit={submitHandler}
    >
      <div className='flex flex-col gap-5'>
        <h2 className='heading-2'>{t('profileForm.MP')}</h2>
        <div className='w-full flex flex-col sm:flex-row gap-4'>
          <CInput label={t('profileForm.N')} value={user?.name} />
          <CInput label={t('profileForm.EM')} value={user?.email} />
        </div>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput label={t('profileForm.PN')} value={user?.phoneNumber} />
          <CInput label={t('profileForm.P')} type='password' value={'123456'} />
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-8'>
        <h2 className='heading-2'>{t('profileForm.BI')}</h2>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput
            label={t('profileForm.C')}
            value={user?.billingInformation?.company}
          />
          <CInput
            label={t('profileForm.CIFNIF')}
            value={user?.billingInformation?.cnif}
          />
        </div>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput
            label={t('profileForm.A')}
            value={user?.billingInformation?.address}
          />
          <CInput
            label={t('profileForm.PC')}
            value={user?.billingInformation?.postalCode}
          />
        </div>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput
            label={t('profileForm.Ci')}
            value={user?.billingInformation?.city || ''}
          />
          <CInput
            label={t('profileForm.Cn')}
            value={user?.billingInformation?.country || ''}
          />
        </div>
        <div className='w-full flex gap-4'>
          <CInput
            label={t('profileForm.NRM')}
            value={user?.billingInformation?.nemocastReferal || ''}
          />
        </div>
      </div>
      <div className='flex gap-4 items-start mt-5 max-w-[550px] cursor-pointer'>
        <input
          type='checkbox'
          className='mt-[6px]'
          id='conditions'
          checked={!!user?.billingInformation?.nemocastAgreement}
        />
        <label
          className='p-0 m-0 text-grayish w-full leading-5'
          htmlFor='conditions'
        >
          {t('profileForm.Note')}
        </label>
      </div>
    </form>
  );
};

export default ProfileForm;
