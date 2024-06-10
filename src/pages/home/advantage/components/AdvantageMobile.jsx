import { useAnimation, motion } from 'framer-motion';
import hands from '../../../../assets/hands.svg';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

const AdvantageMobile = () => {
  const { t, i18n } = useTranslation();

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
    <motion.div
      className='advantageMob'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='advantageMob__heading'>
        {t('advantage.New horizons on the invisible level')}
      </div>
      <div className='advantageMob__container'>
        <div className='advantageMob__container__sHeading'>
          {t('advantage.Aligners in-office')}
        </div>
        <img className='w-[356px] h-[144px]' src={hands} alt='' />
      </div>
      <div className='advantageMob__content'>
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
  );
};

export default AdvantageMobile;
