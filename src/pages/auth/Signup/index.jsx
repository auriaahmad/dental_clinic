import { Link, useNavigate } from 'react-router-dom';
import FWButton from '../../../components/form/FWButton';
import googleIcon from '../../../assets/google.svg';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '../../../shared/variants';
import CInput from '../../../components/form/CInput';
import halfEye from '../../../assets/halfEye.svg';
import { useState } from 'react';
import { registerUserAPI } from '../../../apis/authAPIs';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const changeHandler = event => {
    const { name, value } = event.target;
    setUser(pS => ({
      ...pS,
      [name]: value,
    }));
  };
  const submitHandler = async event => {
    event.preventDefault();

    const response = await registerUserAPI(user);
    if (response) navigate('/auth/signin');
  };
  return (
    <div className='signIn'>
      <div className='signIn__box'>
        <h2>{t('signin.welcome')}</h2>

        <form onSubmit={submitHandler} className='signIn__box__form'>
          <CInput
            type='text'
            placeholder={t('signin.name')}
            name='name'
            id='name'
            onChange={changeHandler}
            required={true}
          />
          <CInput
            type='email'
            placeholder={t('signin.yourEmail')}
            name='email'
            id='email'
            onChange={changeHandler}
            required={true}
          />
          <CInput
            type='password'
            placeholder={t('signin.yourPassword')}
            name='password'
            id='password'
            onChange={changeHandler}
            icon={halfEye}
            required={true}
          />
          <CInput
            type='tel'
            placeholder={t('signin.phone')}
            name='phoneNumber'
            id='phoneNumber'
            onChange={changeHandler}
            required={true}
          />
          <div className='signIn__box__form__info'>
            <div className='signIn__box__form__info__loggedIn'>
              <input type='checkbox' />
              <span>{t('signin.keepMeLogin')}</span>
            </div>

            <Link
              className='signIn__box__form__info--link'
              to='/auth/password-recovery'
            >
              {t('signin.forgetPasswords')}
            </Link>
          </div>
          <FWButton
            title={t('signin.SignUp')}
            variant={buttonVariants.theme}
            type='submit'
          />
        </form>
        <span className='signIn__box--redirect'>
          {t('signin.alreadyHaveAnAccount')}
          <Link to='/auth/signin'>{t('signin.LogIn')}!</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
