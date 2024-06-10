import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../store/store';
import { changeLanguage } from 'i18next';
import NavBar from '../common/NavBar';
import { Outlet } from 'react-router';
import Footer from '../common/Footer';
import HomeCard from '../common/HomeCard';
import MobileNav from '../common/MobileNav';
import CookiesPopup from '../common/CookiesPopup';

const HomeLayout = () => {
  const { lang, changeLang, cookies } = useGlobalStore();
  const [cookiesModalOpen, setCookiesModalOpen] = useState(
    !cookies.accepted && !cookies.rejected
  );

  const handleLanguageChange = languageCode => {
    changeLang(languageCode);
    changeLanguage(languageCode);
  };

  useEffect(() => {
    handleLanguageChange(lang);
  }, [lang]);

  return (
    <div>
      <CookiesPopup isOpen={cookiesModalOpen} setIsOpen={setCookiesModalOpen} />
      <div className='homeLayout overflow-x-hidden'>
        <NavBar />

        <Outlet />
        <HomeCard />
        <Footer />
      </div>
      <div className='homeLayoutMob overflow-x-hidden'>
        <div>
          <MobileNav />
        </div>
        <Outlet />
        <HomeCard />
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
