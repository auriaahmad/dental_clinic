import { Outlet } from 'react-router';
import authGlobe from '../../assets/authGlobe.svg';
import planilink from '../../assets/planilink.svg';
import downArrow from '../../assets/down_arrow.svg';
import { langugeMockData } from '../../shared/mock';
import { Menu, Transition } from '@headlessui/react';
import { useGlobalStore } from '../../store/store';
import { changeLanguage } from 'i18next';
import { Fragment, useEffect } from 'react';

const AuthLayout = () => {
  const { lang, changeLang } = useGlobalStore();

  const languages = langugeMockData.languages;

  const handleLanguageChange = languageCode => {
    changeLang(languageCode);
    changeLanguage(languageCode);
  };

  useEffect(() => {
    handleLanguageChange(lang);
  }, [lang]);

  const selectedLanguageData = languages.find(
    language => language.key === lang
  );
  return (
    <div className='auth'>
      <div className='auth__left'>
        <div className='auth__left__blue'>
          <img src={planilink} alt='' className='auth__left__blue--logo' />
          <img src={authGlobe} alt='' className='auth__left__blue--globe' />
        </div>
        <Outlet />

        <div className='mainLayout__header'>
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
                        onClick={() => handleLanguageChange(language.key)}
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
      </div>
      <div className='auth__right'>
        <img src={planilink} alt='' className='auth__right--logo' />
        <img src={authGlobe} alt='' className='auth__right--globe' />
      </div>
    </div>
  );
};

export default AuthLayout;
