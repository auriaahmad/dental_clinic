import { useEffect } from 'react';
import hands from '../../../assets/hands.svg';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AdvantageMobile from './components/AdvantageMobile';
import { Helmet } from 'react-helmet-async';

function Advantage() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <>
      <Helmet>
        <title>Advantage</title>
        <meta
          name='description'
          content='planilink advantage - Provide patients with their aligners in less than 24 hours after case approval.'
        />
        <link rel='canonical' href='https://planilink.com/advantage' />

        <meta name='robots' content='index, follow' />

        {/* <!-- For Social Media --> */}
        <meta name='og:card' content='New horizons on the invisible level' />
        <meta name='og:title' content='planilink' />
        <meta
          name='og:description'
          content='planilink advantage - Provide patients with their aligners in less than 24 hours after case approval.'
        />
        <meta
          name='og:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://planilink.com/advantage' />
        {/* <!-- For Social Media --> */}

        {/* <!-- Tags for twitter --> */}

        <meta
          name='twitter:card'
          content='New horizons on the invisible level'
        />
        <meta name='twitter:title' content='planilink' />
        <meta
          name='twitter:description'
          content='planilink advantage - Provide patients with their aligners in less than 24 hours after case approval.'
        />
        <meta
          name='twitter:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        {/* <!-- Tags for twitter --> */}
      </Helmet>
      <div>
        <motion.div
          className='advantage relative'
          ref={actionRef}
          variants={actionVariants}
          initial='hidden'
          animate={actionControl}
        >
          <div className='circlesGrad absolute top-[15%]  left-[-4rem]' />
          <div className='circlesGrad absolute top-[45%]  right-[-4rem]' />
          <div className='circlesGrad absolute bottom-[10%]  left-[-4rem]' />
          <h1 className='advantage__heading z-20'>
            {t('advantage.New horizons on the invisible level')}
          </h1>
          <div className='advantage__container z-20'>
            <div className='advantage__container__sHeading'>
              {t('advantage.Aligners in-office')}
            </div>
            <img className='w-[796px] h-[322px]' src={hands} alt='' />
          </div>
          <div className='advantage__content z-20'>
            <div className='primaryHeading'>
              {t('advantage.For those who want everything')}
            </div>
            <div>{t('advantage.It is time to get')}</div>
            <div className='primaryHeading'>
              {t('advantage.I want it by today')}
            </div>
            <div>
              {t('advantage.Making your aligners')}
              <br />
              {i18n.language === 'en' ? (
                <>
                  <br />
                  {t('advantage.Provide patients with')}
                  <br /> {t('advantage.Replace the aligners due')}
                  <br />
                  {t('advantage.Forget about waiting')}
                  <br />
                  {t('advantage.Quickly response to')}
                  <br />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className='primaryHeading'>
              {t('advantage.You set the degrees of immersion')}
            </div>
            <div>{t('advantage.You can use this system')}</div>
            <div className='primaryHeading'>
              {t('advantage.Do not give bad news')}
            </div>
            <div>{t('advantage.Decide the profitability')}</div>
            <div className='primaryHeading'>
              {t('advantage.The next trendy aligner')}
            </div>
            <div>{t('advantage.Visualize the design')}</div>
            <div className='primaryHeading'>
              {t('advantage.Shall we tell you a secret?')}
            </div>
            <div>{t('advantage.There is no need to print')}</div>
            <div className='primaryHeading'>{t('advantage.Is that all')}</div>
            <div>{t('advantage.Learning how to handle')}</div>
          </div>
        </motion.div>
        <AdvantageMobile />
      </div>
    </>
  );
}

export default Advantage;
