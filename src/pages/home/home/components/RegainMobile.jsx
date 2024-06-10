import React, { useEffect } from 'react';
import gear from '../../../../assets/gear.svg';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const RegainMobile = () => {
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
      className='homeMob'
      ref={actionRegainRef}
      variants={actionRegainVariants}
      initial='hidden'
      animate={actionRegainControl}
    >
      <div className='homeMob__regainContainer'>
        <div className='homeMob__regainContainer__contentContainer'>
          <div className='homeMob__regainContainer__contentContainer__heading'>
            {t('home.Regain control')}
          </div>
          <div className='homeMob__regainContainer__contentContainer__content'>
            {' '}
            {t('home.biomechanical guarantees')} <br />
            <br />
            {t('home.We do the planning for')}
            <br />
            <br />
            <span className='text-white font-serif text-[15px]'>Plani</span>
            <span className='text-red-500 font-serif text-[15px]'>
              Link
            </span>{' '}
            {t('home.plans your plastic')}
            <br />
            <br />
            {t('home.It is as simple')}
          </div>
        </div>
        <img className='w-[264.831px] h-[261.649px]' src={gear} alt='gear' />
      </div>
    </motion.div>
  );
};

export default RegainMobile;
