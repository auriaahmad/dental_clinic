import React, { useEffect } from 'react';
import gear from '../../../../assets/gear.svg';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useInView } from 'react-intersection-observer';

const RegainControl = () => {
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
      className='home relative'
      ref={actionRegainRef}
      variants={actionRegainVariants}
      initial='hidden'
      animate={actionRegainControl}
    >
      <div className='circlesGrad absolute bottom-0 left-[-4rem]' />
      <div className='home__left z-20'>
        <LazyLoadImage src={gear} alt='gear' />
      </div>
      <div className='home__right'>
        <div className='home__right__heading'>{t('home.Regain control')}</div>
        <div className='home__right__content'>
          {t('home.biomechanical guarantees')} <br />
          <br />
          {t('home.We do the planning for')}
          <br />
          <br />
          <span className='text-white font-serif text-[24px]'>Plani</span>
          <span className='text-red-500 font-serif text-[24px]'>Link</span>{' '}
          {t('home.plans your plastic')}
          <br />
          <br />
          {t('home.It is as simple')}
        </div>
      </div>
    </motion.div>
  );
};

export default RegainControl;
