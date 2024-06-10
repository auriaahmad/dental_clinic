import { Link, useNavigate } from 'react-router-dom';
import FWButton from '../../../components/form/FWButton';
import googleIcon from '../../../assets/google.svg';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '../../../shared/variants';
import CInput from '../../../components/form/CInput';
import halfEye from '../../../assets/halfEye.svg';
import { useState } from 'react';
import { loginUserAPI } from '../../../apis/authAPIs';
import { useGlobalStore } from '../../../store/store';

const Signin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const updateUser = useGlobalStore(state => state.updateUser);
  const [user, setUser] = useState({ email: '', password: '' });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const changeHandler = event => {
    const { name, value } = event.target;
    setUser(pS => ({
      ...pS,
      [name]: value,
    }));
  };
  const submitHandler = async event => {
    event.preventDefault();
    const response = await loginUserAPI(user);
    if (response) {
      updateUser(response.user);
      navigate(
        response.user.type === 'dentist'
          ? '/user/plannings'
          : '/company/plannings'
      );
    }
  };

  function handleSignInWithGoogle() {
    window.open(
      `${process.env.REACT_APP_SERVER_URL}/auth/dentist/google`,
      '_self'
    );
  }

  return (
    <div className='signIn'>
      <div className='signIn__box'>
        <h2>{t('signin.welcome')}</h2>
        <FWButton
          title={t('signin.loginG')}
          icon={googleIcon}
          variant={buttonVariants.white}
          type='button'
          onClick={handleSignInWithGoogle}
          // onClick={loginWithGoogle}
        />
        <div className='signIn__box__borderedMessage'>
          <div className='hLine' />
          <span>{t('signin.loginE')}</span>
          <div className='hLine' />
        </div>
        <form onSubmit={submitHandler} className='signIn__box__form'>
          <CInput
            type='email'
            placeholder={t('signin.yourEmail')}
            name='email'
            id='email'
            onChange={changeHandler}
            required={true}
          />
          <CInput
            type={passwordHidden ? 'password' : 'text'}
            placeholder={t('signin.yourPassword')}
            name='password'
            id='password'
            onChange={changeHandler}
            icon={halfEye}
            required={true}
            onIconClick={() => setPasswordHidden(pS => !pS)}
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
            title={t('signin.LogIn')}
            variant={buttonVariants.theme}
            type='submit'
          />
        </form>
        <span className='signIn__box--redirect'>
          {t('signin.DoNotHaveAccountYet')}
          <Link to='/auth/signup'>{t('signin.SignUp')}!</Link>
        </span>
      </div>
    </div>
  );
};

export default Signin;
