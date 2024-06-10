import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import sleeves from '../../../../assets/sleeves.svg';

const SleevesMobile = () => {
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
      className='sleevesMob'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='sleevesMob__heading px-[20px]'>
        {t('home.We have several aces up our sleeves')}
      </div>
      <div className='sleevesMob__container'>
        <div>
          <div>
            <span className='text-white font-serif'>Plani</span>
            <span className='text-red-500 font-serif'>Link </span>
            {t('home.is a complete plastic')}
          </div>
          <div>{t('home.Planning in an experienced')}</div>
          <div>{t('home.Whatever your patient')}</div>
          <div>{t('home.Each of our plans')}</div>
          <div>{t('home.Training courses and regular')}</div>
        </div>
      </div>
      <img className='h-[243px] w-[322px]' src={sleeves} alt='' />
    </motion.div>
  );
};

export default SleevesMobile;
