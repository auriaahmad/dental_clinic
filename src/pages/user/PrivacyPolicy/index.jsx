import CookiesSettingModal from './components/CookiesSettingModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col '>
      <h1 className='heading-1'>{t('privacy.Privacy')}</h1>
      <div className='w-full  mt-[24px] pt-[38px] pb-5'>
        <h3 className='heading-5 mb-[8px]'>{t('privacy.Updated as of')}</h3>
        <h3 className='heading-5 mb-[8px]'>{t('privacy.Intro')}</h3>

        <p> {t('privacy.Your privacy is very important')}</p>
        <p> {t('privacy.By using our Sites')}</p>

        <h3 className='heading-5 mt-[32px]'>
          {t('privacy.Information we collect from you')}
        </h3>
        <p> {t('privacy.We collect Personal Information')}</p>
        <p> {t('privacy.When collecting health data')}</p>
        <p> {t('privacy.We will also collect')}</p>
        <p> {t('privacy.Sometimes you may choose')}</p>

        <h3 className='heading-5 mt-[32px]'>
          {t('privacy.What do we do with the information we collect?')}
        </h3>
        <div>{t('privacy.We use your Personal Information')}</div>
        <div>{t('privacy.Set up and manage your')}</div>
        <div>{t('privacy.Provide you with information')}</div>
        <div>{t('privacy.Provide you with details of doctors')}</div>
        <div>{t('privacy.Invite you to participate')}</div>
        <div>{t('privacy.Collect demographic information')}</div>
        <div>{t('privacy.Extra line1 in spanish')}</div>
        <div>{t('privacy.Analyze the use of our services')}</div>
        <div>{t('privacy.Use content uploaded to the')}</div>
        <div>{t('privacy.Extra line2 in spanish')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('privacy.Who do we share your Personal Information with?')}
        </h3>
        <div>{t('privacy.We partner with other companies')}</div>
        <div>{t('privacy.Additionally, all information')}</div>
        <div>{t('privacy.We may also disclose Personal')}</div>
        <h3 className='heading-5 mt-[32px]'>
          {t('privacy.Cookies y anuncios')}
        </h3>
        <div> {t('privacy.Al igual que muchos sitios web')}</div>
        <h3 className='heading-5 mt-[32px]'>{t('privacy.Online tracking')}</h3>
        <div> {t('privacy.Do Not Track (DNT) is a privacy')}</div>
        <h3 className='heading-5 mt-[32px]'>
          {' '}
          {t('privacy.Links to other sites')}
        </h3>
        <div> {t('privacy.Our Sites may contain link')}</div>
        <div> {t('privacy.Additionally, you have the opportunity')}</div>
        <h3 className='heading-5 mt-[32px]'>
          {t('privacy.Marketing and do not contact')}
        </h3>
        <div> {t('privacy.Where you have given us')}</div>
        <div> {t('privacy.Nebula Nexus LLC offers')}</div>
        <div> {t('privacy.You should note that such')}</div>
        <h3 className='heading-5 mt-[32px]'>
          {t('privacy.International data transfers')}
        </h3>
        <div> {t('privacy.Nebula Nexus LLC operates')}</div>
        <h3 className='heading-5 mt-[32px]'>{t('privacy.Security')}</h3>
        <div> {t('privacy.The security of all')}</div>
        <h3 className='heading-5 mt-[32px]'>{t('privacy.Updates')}</h3>
        <div> {t('privacy.This statement may be updated')}</div>
        <h3 className='heading-5 mt-[32px]'>{t('privacy.CONTACT')}</h3>
        <div> {t('privacy.If you have any questions')}</div>
        <div> {t('privacy.Extra line3 in spanish')}</div>
        <div> {t('privacy.Nebula Nexus LLC')}</div>
        <div> {t('privacy.Attention: Privacy Office')}</div>
        <div>{t('privacy.8206 Louisiana Blvd')}</div>
        <div>{t('privacy.USA')}</div>
        <div>{t('privacy.privacy@planilink.com')}</div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
