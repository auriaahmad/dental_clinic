// QALayout.js
import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function QALayout() {
  const { t } = useTranslation();
  const location = useLocation();

  const actionControl = useAnimation();
  const [actionRef, actionInView] = useInView();

  const actionVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    if (actionInView) actionControl.start('visible');
    else actionControl.start('hidden');
  }, [actionControl, actionInView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isTabActive = tabPath => {
    return location.pathname.includes(tabPath);
  };

  return (
    <>
      <Helmet>
        <title>FAQ</title>
        <meta name='description' content='planilink Q and A - Q & A' />
        <link rel='canonical' href='https://planilink.com/faq' />

        <meta name='robots' content='index, follow' />

        {/* <!-- For Social Media --> */}
        <meta name='og:card' content='planilink Q and A - Q & A' />
        <meta name='og:title' content='FAQ' />
        <meta name='og:description' content='planilink Q and A - Q & A' />
        <meta
          name='og:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://planilink.com/faq' />
        {/* <!-- For Social Media --> */}

        {/* <!-- Tags for twitter --> */}

        <meta name='twitter:card' content='planilink Q and A - Q & A' />
        <meta name='twitter:title' content='FAQ' />
        <meta name='twitter:description' content='planilink Q and A - Q & A' />
        <meta
          name='twitter:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        {/* <!-- Tags for twitter --> */}
      </Helmet>
      <motion.div
        ref={actionRef}
        variants={actionVariants}
        initial='hidden'
        animate={actionControl}
      >
        <div className='qaLayout relative'>
          <div className='circlesGrad absolute top-[15%]  left-[-4rem]' />
          <div className='circlesGrad absolute bottom-0  right-[-4rem]' />
          <div className='qaLayout__heading z-20'>
            {t('qaLayout.Questions and answers')}
          </div>
          <div className='qaLayout__tabs z-20'>
            <Link
              to='/faq/web'
              className={isTabActive('/web') ? 'active-tab' : ''}
            >
              <div className='qaLayout__tabs__tab'>{t('qaLayout.Web')}</div>
            </Link>
            <Link
              to='/faq/biomodels'
              className={isTabActive('/biomodels') ? 'active-tab' : ''}
            >
              <div className='qaLayout__tabs__tab'>
                {t('qaLayout.Biomodels')}
              </div>
            </Link>
            <Link
              to='/faq/planning'
              className={isTabActive('/planning') ? 'active-tab' : ''}
            >
              <div className='qaLayout__tabs__tab'>
                {t('qaLayout.Planning')}
              </div>
            </Link>
            <Link
              to='/faq/records'
              className={isTabActive('/records') ? 'active-tab' : ''}
            >
              <div className='qaLayout__tabs__tab'>{t('qaLayout.Records')}</div>
            </Link>
            <Link
              to='/faq/alignerManufacturing'
              className={
                isTabActive('/alignerManufacturing') ? 'active-tab' : ''
              }
            >
              <div className='qaLayout__tabs__tab'>
                {t('qaLayout.Aligner manufacturing')}
              </div>
            </Link>
            <Link
              to='/faq/alignerMaterial'
              className={isTabActive('/alignerMaterial') ? 'active-tab' : ''}
            >
              <div className='qaLayout__tabs__tab'>
                {t('qaLayout.Aligner material')}
              </div>
            </Link>
            <Link
              to='/faq/payment'
              className={isTabActive('/payment') ? 'active-tab' : ''}
            >
              <div className='qaLayout__tabs__tab'>{t('qaLayout.Payment')}</div>
            </Link>
            <Link
              to='/faq/planiLinkSupport'
              className={isTabActive('/planiLinkSupport') ? 'active-tab' : ''}
            >
              <div className='qaLayout__tabs__tab'>
                <div>
                  <span className='text-white'>Plani</span>
                  <span className='text-red-500'>Link</span>
                </div>
                {t('qaLayout.Support')}
              </div>
            </Link>
          </div>
          <div className='z-20'>
            <Outlet />
          </div>
        </div>

        <div className='qaLayoutMob'>
          <div className='qaLayoutMob__heading'>
            {t('qaLayout.Questions and answers')}
          </div>
          <div className='qaLayoutMob__tabs'>
            <Link
              to='/faq/web'
              className={isTabActive('/web') ? 'active-tabMob' : ''}
            >
              <div className='qaLayoutMob__tabs__tab'>{t('qaLayout.Web')}</div>
            </Link>
            <Link
              to='/faq/biomodels'
              className={isTabActive('/biomodels') ? 'active-tabMob' : ''}
            >
              <div className='qaLayoutMob__tabs__tab'>
                {t('qaLayout.Biomodels')}
              </div>
            </Link>
            <Link
              to='/faq/planning'
              className={isTabActive('/planning') ? 'active-tabMob' : ''}
            >
              <div className='qaLayoutMob__tabs__tab'>
                {t('qaLayout.Planning')}
              </div>
            </Link>
            <Link
              to='/faq/records'
              className={isTabActive('/records') ? 'active-tabMob' : ''}
            >
              <div className='qaLayoutMob__tabs__tab'>
                {t('qaLayout.Records')}
              </div>
            </Link>

            <Link
              to='/faq/alignerManufacturing'
              className={
                isTabActive('/alignerManufacturing') ? 'active-tabMob' : ''
              }
            >
              <div className='qaLayoutMob__tabs__tab'>
                {t('qaLayout.Aligner manufacturing')}
              </div>
            </Link>
            <Link
              to='/faq/alignerMaterial'
              className={isTabActive('/alignerMaterial') ? 'active-tabMob' : ''}
            >
              <div className='qaLayoutMob__tabs__tab'>
                {t('qaLayout.Aligner material')}
              </div>
            </Link>

            <Link
              to='/faq/payment'
              className={isTabActive('/payment') ? 'active-tabMob' : ''}
            >
              <div className='qaLayoutMob__tabs__tab'>
                {t('qaLayout.Payment')}
              </div>
            </Link>
            <Link
              to='/faq/planiLinkSupport'
              className={
                isTabActive('/planiLinkSupport') ? 'active-tabMob' : ''
              }
            >
              <div className='qaLayoutMob__tabs__tab'>
                <div>
                  <span className='text-white'>Plani</span>
                  <span className='text-red-500'>Link</span>
                </div>
                {t('qaLayout.Support')}
              </div>
            </Link>
          </div>
          <Outlet />
        </div>
      </motion.div>
    </>
  );
}

export default QALayout;
