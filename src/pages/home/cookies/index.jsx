import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function Cookies() {
  const { t } = useTranslation();
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

  return (
    <>
      <Helmet>
        <title>Cookies</title>
        <meta name='description' content='Planilink Cookies' />
        <link rel='canonical' href='https://planilink.com/cookies' />

        <meta name='robots' content='index, follow' />

        {/* <!-- For Social Media --> */}
        <meta name='og:card' content='Planilink Cookies' />
        <meta name='og:title' content='Cookies' />
        <meta name='og:description' content='Planilink Cookies' />
        <meta
          name='og:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://planilink.com/cookies' />
        {/* <!-- For Social Media --> */}

        {/* <!-- Tags for twitter --> */}

        <meta name='twitter:card' content='Planilink Cookies' />
        <meta name='twitter:title' content='Cookies' />
        <meta name='twitter:description' content='Planilink Cookies' />
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
        <div className='cookies relative'>
          <div className='circlesGrad absolute top-[15%]  left-[-4rem]' />
          <div className='circlesGrad absolute top-[45%]  right-[-4rem]' />
          <div className='circlesGrad absolute bottom-[10%]  left-[-4rem]' />
          <h1 className='cookies__heading z-20'>{t('cookies.Cookies')}</h1>
          <div className='cookies__textarea z-20'>
            <div>
              <div className='primaryHeading'>{t('cookies.Cookie Policy')}</div>
              <div>{t('cookies.Last updated')}</div>
              <div>{t('cookies.This cookie policy')}</div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.WHAT ARE COOKIES?')}
              </div>
              <div>{t('cookies.Cookies are small text')}</div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.How we use cookies')}
              </div>
              <div>{t('cookies.We use cookies for')}</div>
              <div>
                <h4 className='font-bold inline'>
                  {t('cookies.Essential Cookies')}
                </h4>{' '}
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
            </div>

            <div>
              <div className='primaryHeading'>
                {t('cookies.How Can I Control Cookies?')}
              </div>
              <div>{t('cookies.You can control')}</div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.Changes to Our Cookie Policy')}
              </div>
              <div>{t('cookies.Any changes we may')}</div>
            </div>
          </div>
        </div>
        <div className='cookiesMob'>
          <div className='cookiesMob__heading'>{t('cookies.Cookies')}</div>
          <div className='cookiesMob__textarea'>
            <div>
              <div className='primaryHeading'>
                {t('cookies.INFORMATION ABOUT COOKIES')}
              </div>
              <div>{t('cookies.Due to the entry')}</div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.WHAT ARE COOKIES?')}
              </div>
              <div>{t('cookies.Cookies and other similar')}</div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.COOKIES AFFECTED')}
              </div>
              <div>{t('cookies.According to the EU')}</div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.TYPES OF COOKIES')}
              </div>
              <div className='cookie-content'>
                <div>{t('cookies.ACCORDING TO THE PURPOSE')}</div>
                <div>{t('cookies.Technical and functional cookies')}</div>
                <div>{t('cookies.Analytical cookies')}</div>
                <div>{t('cookies.Advertising cookies')}</div>
                <div>{t('cookies.Behavioral advertising cookies')}</div>
                <div>{t('cookies.Social Cookies')}</div>
                <div>{t('cookies.Affiliate cookies')}</div>
                <div>{t('cookies.Security cookies')}</div>
                <div>{t('cookies.ACCORDING TO THE PROPERTY')}</div>
                <div>{t('cookies.Own cookies')}</div>
                <div>{t('cookies.Third-party cookies')}</div>
                <div>{t('cookies.ACCORDING TO THE CONSERVATION PERIOD')}</div>
                <div>{t('cookies.Session cookies')}</div>
                <div>{t('cookies.Persistent cookies')}</div>
              </div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.COOKIES USED ON THIS WEBSITE')}
              </div>
              <div>
                {t('cookies.From this panel')}
                <br />
                {t('cookies.The selected cookies')}
                <br /> {t('cookies.The user can')}
                <br />
              </div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.COOKIES CONTROLLED BY THE PUBLISHE')}
              </div>
              <div>{t('cookies.No publisher-controlled')}</div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.THIRD PARTY COOKIES')}
              </div>
              <div>
                {t('cookies.Third party services')}
                <br />
                {t('cookies.External providers')}
              </div>
            </div>
            <div>
              <div className='primaryHeading'>
                {t('cookies.HOW TO MANAGE COOKIES FROM THE BROWSER')}
              </div>
              <div>
                {' '}
                {t('cookies.Delete Cookies from Device')}
                <br />
                {t('cookies.Manage site-specific')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Cookies;
