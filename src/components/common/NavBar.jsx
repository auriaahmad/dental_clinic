import React from 'react';
import logo from '../../assets/planilink.svg';
import { useTranslation } from 'react-i18next';
import FWButton from '../form/FWButton';
import { useGlobalStore } from '../../store/store';
import { changeLanguage } from 'i18next';
import { useNavigate } from 'react-router';
import useHelpers from '../../hooks/useHelpers';
import { setUserLangAPI } from '../../apis/userAPIs';

function NavBar() {
  const { t } = useTranslation();
  const { navigateToPage } = useHelpers();
  const { lang, changeLang, updateUser, user } = useGlobalStore();

  const handleLanguageChange = languageCode => {
    changeLang(languageCode);
    changeLanguage(languageCode);
  };

  const updateLangInDB = async languageCode => {
    if (user) {
      const response = await setUserLangAPI(languageCode, user._id);
      if (response) {
        updateUser(response.user);
      }
    }
  };

  return (
    <div>
      <div className='navbar z-50'>
        <img className='w-[152px] h-[51px]' src={logo} alt='logo' />
        <div className='flex gap-[16px]'>
          <div>
            <FWButton
              title={t('buttons.Main')}
              variant='nothing'
              onClick={() => navigateToPage('/')}
              className='z-50'
            />
          </div>
          <div>
            <FWButton
              title={t('buttons.New horizons on the invisible level')}
              variant='nothing'
              onClick={() => navigateToPage('/advantage')}
              className='z-50'
            />
          </div>
          <div>
            <FWButton
              title={t('buttons.FAQ')}
              variant='nothing'
              onClick={() => navigateToPage('/faq/web')}
              className='z-50'
            />
          </div>
          <div>
            <FWButton
              title={t('buttons.Do we fabricate aligners?')}
              variant='nothing'
              onClick={() => navigateToPage('/aligners')}
              className='z-50'
            />
          </div>
        </div>
        <div className='flex gap-[24px] z-30'>
          <div>
            <FWButton
              title={t('buttons.Planning area')}
              variant='transparent'
              onClick={() => navigateToPage('/user/plannings')}
            />
          </div>
          <div className='w-[192px] h-[56px] bg-[#222539] rounded-full flex'>
            <FWButton
              title='English'
              variant={lang === 'en' ? 'sky' : 'nothing'}
              onClick={() => {
                handleLanguageChange('en');
                updateLangInDB('en');
              }}
            />
            <FWButton
              title='Spanish'
              variant={lang === 'es' ? 'sky' : 'nothing'}
              onClick={() => {
                handleLanguageChange('es');
                updateLangInDB('es');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
