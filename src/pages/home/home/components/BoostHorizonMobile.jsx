import React, { useEffect } from 'react';
import FWButton from '../../../../components/form/FWButton';
import finger from '../../../../assets/finger.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BoostHorizonMobile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const actionRegainControl = useAnimation();
  const [actionRegainRef, actionRegainInView] = useInView();

  const actionRegainVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0, x: 20 },
  };

  useEffect(() => {
    if (actionRegainInView) actionRegainControl.start('visible');
    else actionRegainControl.start('hidden');
  }, [actionRegainControl, actionRegainInView]);

  return (
    <motion.div
      className='boostHorizonMob'
      ref={actionRegainRef}
      variants={actionRegainVariants}
      initial='hidden'
      animate={actionRegainControl}
    >
      <div className='boostHorizonMob__heading'>{t('home.We boost you')}</div>

      <div className='boostHorizonMob__textarea'>
        <div className='boostHorizonMob__textarea__right'>
          <div className='boostHorizonMob__textarea__right__above'>
            <div className='boostHorizonMob__textarea__right__above__heading'>
              {t('home.Profitability and versatility')}
            </div>
            <div className='boostHorizonMob__textarea__right__above__content'>
              {t('home.Working together with')}
            </div>
          </div>
          <div className='boostHorizonMob__textarea__right__below'>
            <div className='boostHorizonMob__textarea__right__below__heading'>
              {t('home.Shorter waiting times')}
            </div>
            <div className='boostHorizonMob__textarea__right__below__content'>
              {t('home.With biomodels in')}
            </div>
          </div>
        </div>
        <div className='boostHorizonMob__textarea__left'>
          <div className='boostHorizonMob__textarea__left__above'>
            <div className='boostHorizonMob__textarea__left__above__heading'>
              {' '}
              {t('home.Fully customizable system')}
            </div>
            <div className='boostHorizonMob__textarea__left__above__content'>
              {t('home.We first plan')}
            </div>
          </div>
          <div className='boostHorizonMob__textarea__left__below'>
            <div className='boostHorizonMob__textarea__left__below__heading'>
              {t('home.Differentiation')}
            </div>
            <div className='boostHorizonMob__textarea__left__below__content'>
              {t('home.In a market led')}
            </div>
          </div>
        </div>
      </div>
      <div className='boostHorizonMob__image'>
        <img src={finger} alt='finger' />
      </div>
      <div className='w-[149px]'>
        <FWButton
          title={t('home.Learn More')}
          variant='skyMob'
          onClick={() => navigate('/advantage')}
        />
      </div>
    </motion.div>
  );
};

export default BoostHorizonMobile;
