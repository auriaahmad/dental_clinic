import React, { useEffect } from 'react';
import Cards from './Cards';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';

const PlanningToChoose = () => {
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
      className='cards relative'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='circlesGrad absolute bottom-[20%]  right-[-4rem]' />
      <div className='cards__heading z-20'>
        {t('home.What planning to choose?')}
      </div>
      <div className='cards__container z-20'>
        <Cards title={t('planCard.aligners15')} discount='10%' />
        <Cards title={t('planCard.aligners25')} discount='15%' />
        <Cards title={t('planCard.alignersMore')} discount='20%' />
      </div>
      <div className='w-[233px] z-20'>
        <FWButton
          title={t('home.Learn More')}
          variant='sky'
          style={{ fontWeight: '700', fontSize: '1.15rem' }}
          onClick={() => navigate('/auth/signin')}
        />
      </div>
    </motion.div>
  );
};

export default PlanningToChoose;
