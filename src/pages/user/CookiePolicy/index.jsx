import CookiesSettingModal from './components/CookiesSettingModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  const { t } = useTranslation();
  const [cookiesSettingModal, setCookiesSettingModal] = useState(true);
  const closeCookiesSettingModal = () => setCookiesSettingModal(false);
  return (
    <div className='flex flex-col'>
      <h1 className='heading-1'>{t('cookiePolicy.CP')}</h1>
      <div className='w-full h-[1047px] mt-[24px] pt-[38px]'>
        <h3 className='heading-5 mb-[8px]'>{t('cookies.Cookie Policy')}</h3>

        <p>{t('cookies.Last updated')}</p>
        <p>{t('cookies.This cookie policy')}</p>

        <h3 className='heading-5 mt-[32px]'>
          {t('cookies.WHAT ARE COOKIES?')}
        </h3>
        <p>{t('cookies.Cookies are small text')}</p>

        <h3 className='heading-5 mt-[32px]'>
          {t('cookies.How we use cookies')}
        </h3>
        <p>{t('cookies.We use cookies for')}</p>
        <div>
          <h4 className='font-bold inline'>{t('cookies.Essential Cookies')}</h4>{' '}
          <span>{t('cookies.These cookies are necessary')}</span>
        </div>
        <div>
          <h4 className='font-bold inline'>
            {t('cookies.Performance Cookies')}
          </h4>{' '}
          <span>{t('cookies.These cookies allow us')}</span>
        </div>
        <div>
          <h4 className='font-bold inline'>
            {t('cookies.Functionality Cookies')}
          </h4>{' '}
          <span>{t('cookies.These cookies are used')}</span>
        </div>
        <div>
          <h4 className='font-bold inline'>
            {t('cookies.Advertising Cookies')}
          </h4>{' '}
          <span>{t('cookies.These cookies record')}</span>
        </div>

        <h3 className='heading-5 mt-[32px]'>
          {t('cookies.How Can I Control Cookies?')}
        </h3>
        <div>{t('cookies.You can control')}</div>
        <h3 className='heading-5 mt-[32px]'>
          {t('cookies.Changes to Our Cookie Policy')}
        </h3>
        <div>{t('cookies.Any changes we may')}</div>
      </div>
      <CookiesSettingModal
        open={cookiesSettingModal}
        handleClose={closeCookiesSettingModal}
      />
    </div>
  );
};

export default CookiePolicy;
