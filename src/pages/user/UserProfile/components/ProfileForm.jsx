import CInput from '../../../../components/form/CInput';
import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../../../../store/store';
import { useEffect, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';
import { updateMyProfile } from '../../../../apis/userAPIs';
import { toast } from 'react-toastify';
import { lang } from '../../../../shared/languages/lang';

const ProfileForm = () => {
  const { t } = useTranslation();
  const user = useGlobalStore(state => state.user);
  const language = useGlobalStore(state => state.lang);
  const updateUser = useGlobalStore(state => state.updateUser);

  const [tempUser, setTempUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    company: '',
    cnif: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    nemocastReferal: '',
    nemocastAgreement: false,
  });

  useEffect(() => {
    setTempUser({ ...user });
  }, [user]);
  const submitHandler = async event => {
    event.preventDefault();

    const data = {
      ...tempUser,
    };
    if (!tempUser.password) {
      delete data.password;
    }

    const response = await updateMyProfile(tempUser);
    if (response) {
      updateUser(response.user);
      toast(lang[language].success, { toastId: 1 });
    }
  };
  const changeHandler = event => {
    const { name, value, checked } = event.target;

    setTempUser(pS => {
      let copy = JSON.parse(JSON.stringify(pS));
      if (name === 'nemocastAgreement') {
        copy.billingInformation.nemocastAgreement = checked;
      }
      copy[name] = name === 'nemocastAgreement' ? checked : value;
      return copy;
    });
  };

  return (
    <form
      className='max-w-[750px] w-full flex flex-col'
      onSubmit={submitHandler}
    >
      <div className='flex flex-col gap-5'>
        <h2 className='heading-2'>{t('profileForm.MP')}</h2>
        <div className='w-full flex-col sm:flex-row flex gap-4'>
          <CInput
            label={t('profileForm.N')}
            name='name'
            id='name'
            onChange={changeHandler}
            defaultValue={user?.name}
            required={true}
          />
          <CInput
            label={t('profileForm.EM')}
            name='email'
            id='email'
            type='email'
            required={true}
            onChange={changeHandler}
            defaultValue={user?.email}
          />
        </div>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput
            label={t('profileForm.PN')}
            name='phoneNumber'
            id='phoneNumber'
            type='tel'
            required={true}
            onChange={changeHandler}
            defaultValue={user?.phoneNumber}
          />
          <CInput
            label={t('profileForm.P')}
            type='password'
            name='password'
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-8'>
        <h2 className='heading-2'>{t('profileForm.BI')}</h2>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput
            label={t('profileForm.C')}
            name='company'
            id='company'
            onChange={changeHandler}
            defaultValue={user?.billingInformation?.company}
          />
          <CInput
            label={t('profileForm.CIFNIF')}
            name='cnif'
            id='cnif'
            onChange={changeHandler}
            defaultValue={user?.billingInformation?.cnif}
          />
        </div>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput
            label={t('profileForm.A')}
            name='address'
            id='address'
            onChange={changeHandler}
            defaultValue={user?.billingInformation?.address}
          />
          <CInput
            label={t('profileForm.PC')}
            name='postalCode'
            id='postalCode'
            onChange={changeHandler}
            defaultValue={user?.billingInformation?.postalCode}
          />
        </div>
        <div className='w-full flex gap-4 flex-col sm:flex-row'>
          <CInput
            label={t('profileForm.Ci')}
            name='city'
            id='city'
            onChange={changeHandler}
            defaultValue={user?.billingInformation?.city}
          />
          <CInput
            label={t('profileForm.Cn')}
            name='country'
            id='country'
            onChange={changeHandler}
            defaultValue={user?.billingInformation?.country}
          />
        </div>
        <div className='w-full flex gap-4'>
          <CInput
            label={t('profileForm.NRM')}
            name='nemocastReferal'
            id='nemocastReferal'
            onChange={changeHandler}
            defaultValue={user?.billingInformation?.nemocastReferal}
          />
        </div>
      </div>
      <div className='flex gap-4 items-start mt-5 max-w-[550px] cursor-pointer'>
        <input
          type='checkbox'
          className='mt-[6px]'
          id='conditions'
          name='nemocastAgreement'
          onChange={changeHandler}
          checked={tempUser?.billingInformation?.nemocastAgreement}
        />
        {console.log(tempUser?.billingInformation?.nemocastAgreement)}
        <label
          className='p-0 m-0 text-grayish w-full leading-5'
          htmlFor='conditions'
        >
          {t('profileForm.Note')}
        </label>
      </div>
      <div className='w-full flex justify-center mt-4'>
        <SmButton
          style={styles.payBtnStyle}
          variant='medium'
          title='Update'
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
export default ProfileForm;
