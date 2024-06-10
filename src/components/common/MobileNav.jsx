import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import downArrow from '../../assets/down_arrow.svg';
import burger from '../../assets/burger.svg';
import SideBarHome from './SideBarHome';
import logo from '../../assets/planilink.svg';
import FWButton from '../form/FWButton';
import { useGlobalStore } from '../../store/store';
import { useTranslation } from 'react-i18next';
import { langugeMockData } from '../../shared/mock';
import { changeLanguage } from 'i18next';
import { twMerge } from 'tailwind-merge';
import { setUserLangAPI } from '../../apis/userAPIs';
import { useNavigate } from 'react-router';

const MobileNav = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation();
  const { lang, changeLang, user, updateUser } = useGlobalStore();

  const languages = langugeMockData.languages;
  const selectedLanguageData = languages.find(
    language => language.key === lang
  );

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

  const toggleSidebar = () => setIsSidebarOpen(pS => !pS);

  return (
    <div className='mobnavbar z-30'>
      <div className='mobnavbar__left'>
        <img className='' src={burger} alt='burger' onClick={toggleSidebar} />
        <img className='w-[74px] h-[30px]' src={logo} alt='logo' />
      </div>
      <div className='mobnavbar__right'>
        <div>
          <Menu as='div' className='relative inline-block text-left z-30 '>
            <div>
              <Menu.Button>
                {selectedLanguageData && (
                  <div className='flex gap-3 items-center'>
                    <i className='fa-solid fa-chevron-down text-white'></i>

                    <img
                      src={selectedLanguageData.img}
                      alt={`${selectedLanguageData.value} flag`}
                      className='rounded-full w-6 h-6 mr-2'
                    />
                  </div>
                )}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute overflow-hidden right-0 mt-2 w-30 origin-top-right bg-[#2D3045] rounded-md shadow-lg focus:outline-none'>
                {languages.map((language, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <div
                        onClick={() => {
                          handleLanguageChange(language.key);
                          updateLangInDB(language.key);
                        }}
                        className={`${twMerge(
                          'flex items-center justify-between py-2 px-4 cursor-pointer'
                        )} `}
                      >
                        <div className='flex gap-2 items-center'>
                          <span
                            className={twMerge(
                              'uppercase w-5 text-[#737794]',
                              (active || lang === language.key) && 'text-white'
                            )}
                          >
                            {language.key}
                          </span>
                          <div className='w-6 h-6 rounded-ful'>
                            <img
                              className='rounded-full w-6 h-6'
                              src={language.img}
                              alt={`${language.value} flag`}
                            />{' '}
                          </div>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div>
          <FWButton
            title={t('buttons.Planning area')}
            variant='mobtransparent'
            style={{ fontSize: '0.5rem' }}
            onClick={() => navigate('/user/plannings')}
          />
        </div>
      </div>
      {isSidebarOpen && <SideBarHome toggleSidebar={toggleSidebar} />}
    </div>
  );
};

export default MobileNav;
