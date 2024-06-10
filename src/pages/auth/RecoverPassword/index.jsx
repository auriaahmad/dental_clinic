import { useState } from 'react';
import halfEye from '../../../assets/halfEye.svg';
import arrowLeftWhite from '../../../assets/arrowLeftWhite.svg';
import CInput from '../../../components/form/CInput';
import FWButton from '../../../components/form/FWButton';
import { buttonVariants } from '../../../shared/variants';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  requestPasswordResetAPI,
  resetPasswordAPI,
  verifyOTPAPI,
} from '../../../apis/authAPIs';

const RecoverPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stage, setStage] = useState('email');

  const [requestID, setRequestID] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');

  const changeHandler = event => {
    const { name, value } = event.target;
    if (name.includes('otp') && value > 9) return;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'confirmPassword':
        return setConfirmPassword(value);
      case 'otp1':
        return setOTP1(value);
      case 'otp2':
        return setOTP2(value);
      case 'otp3':
        return setOTP3(value);
      case 'otp4':
        return setOTP4(value);

      default:
        break;
    }
  };
  const submitHandler = async event => {
    event.preventDefault();
    // setStage(pS => (pS === 'email' ? 'code' : 'password'));

    if (stage === 'email') {
      const response = await requestPasswordResetAPI({ email });
      if (response) {
        setStage('code');
        setRequestID(response._id);
      }
    } else if (stage === 'code') {
      const response = await verifyOTPAPI({
        otp: `${otp1}${otp2}${otp3}${otp4}`,
        _id: requestID,
      });
      if (response) {
        setRequestID(response._id);
        setStage('password');
      }
    } else if (stage === 'password') {
      const response = await resetPasswordAPI({
        password,
        _id: requestID,
      });
      if (response) {
        navigate('/auth/signin');
      }
    }
  };
  return (
    <div className='passwordRecovery'>
      <Link to='/auth/signin' className='passwordRecovery__navigation'>
        <img src={arrowLeftWhite} alt='' />
      </Link>
      <div className='passwordRecovery__box '>
        {stage === 'password' ? (
          <h3>{t('passwordRecovery.createNewPassword')} </h3>
        ) : (
          <h4>{t('passwordRecovery.button')} </h4>
        )}
        {stage !== 'password' && (
          <p>
            {stage === 'code'
              ? t('passwordRecovery.checkEmailMessage')
              : t('passwordRecovery.instructions')}
          </p>
        )}
        <form onSubmit={submitHandler} className='passwordRecovery__box__form'>
          {stage === 'email' ? (
            <CInput
              type='email'
              name='email'
              id='email'
              placeholder={t('passwordRecovery.email')}
              onChange={changeHandler}
              required={true}
            />
          ) : stage === 'password' ? (
            <>
              <CInput
                type='password'
                name='password'
                id='password'
                placeholder={t('passwordRecovery.newPasswordLabel')}
                onChange={changeHandler}
                required={true}
                icon={halfEye}
              />
              <CInput
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                placeholder={t('passwordRecovery.repeatNewPasswordLabel')}
                onChange={changeHandler}
                required={true}
              />
            </>
          ) : (
            <div className='passwordRecovery__box__form__code'>
              <input
                type='number'
                max={9}
                min={0}
                name='otp1'
                onChange={changeHandler}
                value={otp1}
                required
              />
              <input
                type='number'
                max={9}
                min={0}
                value={otp2}
                name='otp2'
                onChange={changeHandler}
                required
              />
              <input
                type='number'
                max={9}
                min={0}
                value={otp3}
                name='otp3'
                onChange={changeHandler}
                required
              />
              <input
                required
                type='number'
                max={9}
                min={0}
                value={otp4}
                name='otp4'
                onChange={changeHandler}
              />
            </div>
          )}
          <FWButton
            variant={buttonVariants.theme}
            title={t('passwordRecovery.button')}
            type='submit'
          />
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
