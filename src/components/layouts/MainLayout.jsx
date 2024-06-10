import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '../common/Sidebar';
import { Outlet } from 'react-router';
import downArrow from '../../assets/down_arrow.svg';
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { langugeMockData } from '../../shared/mock';
import { useGlobalStore } from '../../store/store';
import { changeLanguage } from 'i18next';
import Loading from '../common/Loading';
import MobileHeader from '../common/MobileHeader';
import useScreenSize from '../../hooks/useResize';
import Notification from '../common/Notification';
import { setUserLangAPI } from '../../apis/userAPIs';

const MainLayout = ({ type }) => {
  const { t } = useTranslation();
  const { lang, changeLang, loading, user, updateUser } = useGlobalStore();

  const { width: screenWidth } = useScreenSize();

  const languages = langugeMockData.languages;

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

  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    handleLanguageChange(lang);
  }, [lang]);

  const selectedLanguageData = languages.find(
    language => language.key === lang
  );

  return (
    <div className='mainLayout'>
      <MobileHeader setShowSideBar={setShowSideBar} />

      {(showSideBar || screenWidth > 900) && (
        <div className='mainLayout__sidebar'>
          <Sidebar type={type} user={user} setShowSideBar={setShowSideBar} />
          <div
            className='mainLayout__sidebar__overlay'
            onClick={() => setShowSideBar(false)}
          ></div>
        </div>
      )}

      <div className='mainLayout__header'>
        <Notification />

        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button>
              {selectedLanguageData && (
                <div className='flex'>
                  <img
                    src={selectedLanguageData.img}
                    alt={`${selectedLanguageData.value} flag`}
                    className='rounded-full w-6 h-6 mr-2'
                  />
                  <img src={downArrow} alt='downArrow' />
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
            <Menu.Items className='absolute right-0 mt-2 w-30 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none'>
              {languages.map((language, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        handleLanguageChange(language.key);
                        updateLangInDB(language.key);
                      }}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center justify-between py-2 px-4 cursor-pointer`}
                    >
                      <div className='flex items-center'>
                        <div className='w-6 h-6 rounded-full bg-gray-300'>
                          <img
                            className='rounded-full'
                            src={language.img}
                            alt={`${language.value} flag`}
                          />{' '}
                        </div>
                        <span className='ml-2'>{language.value}</span>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className='mainLayout__page relative'>
        {loading && (
          <div className='top-0 bottom-0'>
            <Loading />
          </div>
        )}

        <Outlet />
        <div className='mainLayout__page__footer '>
          <span>{t('mainLayout.footNote')}</span>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
