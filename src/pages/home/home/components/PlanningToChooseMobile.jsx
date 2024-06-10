import React, { useEffect } from 'react';
import Cards from './Cards';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';

const PlanningToChooseMobile = () => {
  const navigate = useNavigate();
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
      className='cardsMob'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='cardsMob__heading'>
        {t('home.What planning to choose?')}
      </div>
      <div className='cardsMob__container'>
        <Cards title={t('planCard.aligners15')} discount='10%' />
        <Cards title={t('planCard.aligners25')} discount='15%' />
        <Cards title={t('planCard.alignersMore')} discount='20%' />
      </div>
      <div className='w-[149px]'>
        <FWButton
          title={t('home.Learn More')}
          variant='skyMob'
          onClick={() => navigate('/auth/signin')}
        />
      </div>
    </motion.div>
  );
};

export default PlanningToChooseMobile;
