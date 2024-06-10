import React, { useEffect } from 'react';
import FWButton from '../../../../components/form/FWButton';
import finger from '../../../../assets/finger.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BoostHorizon = () => {
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
      className='boostHorizon relative'
      ref={actionRegainRef}
      variants={actionRegainVariants}
      initial='hidden'
      animate={actionRegainControl}
    >
      <div className='circlesGrad absolute top-[50%] translate-y-[-50%]  right-[-4rem]' />
      <div className='circlesGrad absolute bottom-0  left-[-4rem]' />
      <div className='boostHorizon__heading z-20'>{t('home.We boost you')}</div>
      <div className='boostHorizon__image z-20'>
        <div className='mr-[58px] boostHorizon__image__image'>
          <img className='w-[593px]' src={finger} alt='finger' />
        </div>
        <div className='boostHorizon__image__textarea'>
          <div>
            <div className='primaryHeading'>
              {t('home.Fully customizable system')}
            </div>
            <div>{t('home.We first plan')}</div>
          </div>
          <div>
            <div className='primaryHeading'>
              {t('home.Profitability and versatility')}
            </div>
            <div>{t('home.Working together with')}</div>
          </div>
          <div>
            <div className='primaryHeading'>{t('home.Differentiation')}</div>
            <div>{t('home.In a market led')}</div>
          </div>
          <div>
            <div className='primaryHeading'>
              {t('home.Shorter waiting times')}
            </div>
            <div>{t('home.With biomodels in')}</div>
          </div>
        </div>
      </div>
      <div className='w-[233px] z-20'>
        <FWButton
          title={t('home.Learn More')}
          variant='sky'
          style={{ fontWeight: '700', fontSize: '1.15rem' }}
          onClick={() => navigate('/advantage')}
        />
      </div>
    </motion.div>
  );
};

export default BoostHorizon;
