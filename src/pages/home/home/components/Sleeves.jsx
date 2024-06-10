import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import sleeves from '../../../../assets/sleeves.svg';

const Sleeves = () => {
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

  return (
    <motion.div
      className='sleeves relative'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='circlesGrad absolute top-0  left-[-4rem]' />
      <div className='circlesGrad absolute bottom-0  right-[-4rem]' />
      <div className='sleeves__heading px-[20px] z-20'>
        {t('home.We have several aces up our sleeves')}
      </div>
      <div className='sleeves__container z-20'>
        <div className='sleeves__container__content'>
          <div className='sleeves__container__content--icon'>
            <span className='text-white text-[24px] font-serif'>Plani</span>
            <span className='text-red-500 font-serif'>Link </span>
            {t('home.is a complete plastic')}
          </div>
          <div>{t('home.Planning in an experienced')}</div>
          <div>{t('home.Whatever your patient')}</div>
          <div>{t('home.Each of our plans')}</div>
          <div>{t('home.Training courses and regular')}</div>
        </div>
        <div className='sleeves__container__image'>
          <img className='h-[557px] w-[421px]' src={sleeves} alt='' />
        </div>
      </div>
    </motion.div>
  );
};

export default Sleeves;
