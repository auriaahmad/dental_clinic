import logo from '../../assets/planilink.svg';
import { useTranslation } from 'react-i18next';
import FWButton from '../form/FWButton';
import CInput from '../form/CInput';
import insta from '../../assets/instagram (2).svg';
import visa from '../../assets/visa.svg';
import paypal from '../../assets/paypal.svg';
import googleLogo from '../../assets/googleLogo.svg';
import mastercard from '../../assets/mastercard.svg';
import amaricanexpress from '../../assets/amaricanexpress.svg';
import apple from '../../assets/apple.svg';
import logoLink from '../../assets/logoLink.svg';
import useHelpers from '../../hooks/useHelpers';
import { useState } from 'react';
import { addUserForNewsletterAPI } from '../../apis/newsletterAPIs';
import { useGlobalStore } from '../../store/store';
import { toast } from 'react-toastify';

function Footer() {
  const style = {
    backgroundColor: 'transparent',
    border: '1px solid #737794',
    borderRadius: '1000px',
    color: '#737794',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '110%',
    width: '254px',
  };

  const { lang } = useGlobalStore(state => state);
  const { t } = useTranslation();
  const { navigateToPage } = useHelpers();
  const [email, setEmail] = useState('');
  console.log(lang, '<---');
  const subscribeToNewsletter = async event => {
    event.preventDefault();
    const response = await addUserForNewsletterAPI(email);
    if (response) {
      setEmail('');
      toast(
        lang === 'en'
          ? 'Thank you for subscribing to newsletters!'
          : '¡Gracias por suscribirte a los boletines!',
        { toastId: 1 }
      );
    }
  };

  return (
    <div>
      <div className='footer'>
        <div className='footer__subscribeArea'>
          <div className='footer__subscribeArea__above'>
            <div className=' flex h-[120px] flex-col items-start gap-[20px]'>
              <div className='w-[153px]'>
                <img className='relative right-[6px]' src={logo} alt='logo' />
              </div>
              <div>
                <div className='text-white text-[14px]'>Nebula Nexus LLC</div>
                <div className='text-white text-[14px]'>
                  8206 Louisiana Blvd NE Ste B, #10080, Albuquerque, NM 87113
                </div>
                <div className='text-white text-[14px]'>
                  planilink@planilink.com
                </div>
              </div>
              <div className='text-[#00B0F0] text-[14px]'>
                Growing presence in the United States, Europe and Australia.
              </div>
            </div>
            <div className='flex flex-col w-[376px] h-[78px] gap-[12px]'>
              <label className='home-white-normal' htmlFor=''>
                {t('footer.Subscribe')}
              </label>
              <form
                className='flex gap-[12px]'
                onSubmit={subscribeToNewsletter}
              >
                <div className='h-[50px]'>
                  <CInput
                    placeholder={t('footer.Enter Your Email')}
                    style={style}
                    type='email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required={true}
                  />
                </div>
                <FWButton
                  className='h-[20px]'
                  title={t('footer.Sign Up')}
                  variant='skySmaller'
                  style={{ maxWidth: '100px', width: '100%' }}
                />
              </form>
            </div>
            <div className='w-[73px] h-[54px] flex flex-col gap-3'>
              <span className='text-white text-[14px] sm:text-[16px] leading-[15.4px] sm:leading-[17.6px]'>
                {t('footer.Follow Us')}
              </span>
              <a
                href='https://www.instagram.com/planilink/?hl=es'
                target='_blank'
              >
                <img
                  className='cursor-pointer w-[24px]'
                  src={insta}
                  alt='instagram'
                />
              </a>
            </div>
          </div>
          <div className='footer__subscribeArea__below'>
            <div className='home-grayish'>{t('footer.Copyright')}</div>
            <div className=' flex justify-center items-center gap-[48px] footer__subscribeArea__below__links'>
              <div
                className='home-grayish cursor-pointer'
                onClick={() => navigateToPage('/legal')}
              >
                {t('footer.Legal Warning')}
              </div>
              <div
                className='home-grayish cursor-pointer'
                onClick={() => navigateToPage('/privacy')}
              >
                {t('footer.Privacy Notice')}
              </div>
              <div
                className='home-grayish cursor-pointer'
                onClick={() => navigateToPage('/cookies')}
              >
                {t('footer.Use of cookies')}
              </div>
            </div>
            <div className='flex justify-end items-center gap-[6px]'>
              <img
                className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
                src={visa}
                alt='visa'
              />
              <img
                className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
                src={paypal}
                alt='paypal'
              />
              <img
                className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
                src={googleLogo}
                alt='gpay'
              />
              <img
                className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
                src={mastercard}
                alt='mcard'
              />
              <img
                className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
                src={amaricanexpress}
                alt='amexp'
              />
              <img
                className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
                src={apple}
                alt='appay'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mobfooter'>
        <div className='mobfooter__link'>
          <div className='  h-[120px] flex flex-col items-start gap-[12px]'>
            <div className='w-[130px] h-[60px]'>
              <img className='relative h-[40px]' src={logo} alt='logo' />
            </div>
            <div>
              <div className='text-white text-[12px]'>Nebula Nexus LLC</div>
              <div className='text-white text-[12px]'>
                8206 Louisiana Blvd NE Ste B, #10080, Albuquerque, NM 87113
              </div>
              <div className='text-white text-[12px]'>
                planilink@planilink.com
              </div>
            </div>

            <div className='text-[#00B0F0] text-[12px]'>
              Growing presence in the United States, Europe and Australia.
            </div>
          </div>

          <div className='w-[64px]  h-[43px]'>
            <span className='text-white text-[14px] sm:text-[16px] leading-[15.4px] sm:leainstading-[17.6px]'>
              {t('footer.Follow Us')}
            </span>
            <a
              href='https://www.instagram.com/planilink/?hl=es'
              target='_blank'
            >
              <img className='cursor-pointer' src={insta} alt='instagram' />
            </a>
          </div>
        </div>
        <div className='mobfooter__subscribe mt-8 w-full'>
          <div className='flex flex-col w-full h-[78px] gap-[12px]'>
            <label className='home-white-normal' htmlFor=''>
              {t('footer.Subscribe')}
            </label>
            <div className='flex gap-[12px] w-full'>
              <div className='h-[50px]'>
                <CInput
                  placeholder={t('footer.Enter Your Email')}
                  style={{
                    height: '41px',
                    backgroundColor: 'transparent',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '110%',
                    maxWidth: '450px',
                    width: '100%',
                  }}
                />
              </div>
              <FWButton
                className='h-[20px]'
                title={t('footer.Sign Up')}
                variant='skyMob'
                style={{ width: '100%', maxWidth: '119px' }}
              />
            </div>
          </div>
        </div>
        <div className='mobfooter__end border-t w-full border-solid border-[#FFFFFF26]'>
          <div className='mobfooter__end__content'>{t('footer.Copyright')}</div>
          <div className='flex justify-center w-full items-center gap-[24px] sm:gap-[48px]'>
            <div
              className='mobfooter__end__content cursor-pointer'
              onClick={() => navigateToPage('/legal')}
            >
              {t('footer.Legal Warning')}
            </div>
            <div
              className='mobfooter__end__content cursor-pointer'
              onClick={() => navigateToPage('/privacy')}
            >
              {t('footer.Privacy Notice')}
            </div>
            <div
              className='mobfooter__end__content cursor-pointer'
              onClick={() => navigateToPage('/cookies')}
            >
              {t('footer.Use of cookies')}
            </div>
          </div>
          <div className='flex gap-[6px]'>
            <img
              className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
              src={visa}
              alt='visa'
            />
            <img
              className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
              src={paypal}
              alt='paypal'
            />
            <img
              className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
              src={googleLogo}
              alt='gpay'
            />
            <img
              className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
              src={mastercard}
              alt='mcard'
            />
            <img
              className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
              src={amaricanexpress}
              alt='amexp'
            />
            <img
              className='w-[37px] h-[24px] px-[3px] rounded-[2.67px] bg-[#2F3144] cursor-pointer'
              src={apple}
              alt='apple'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
