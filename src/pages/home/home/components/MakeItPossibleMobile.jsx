import React, { useEffect } from 'react';
import Border from './Border';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import line from '../../../../assets/virticalLine.svg';

const MakeItPossibleMobile = () => {
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

  const palniLinkMob = (
    <span>
      <span className='text-white font-serif text-[12px] font-normal font-weight-400'>
        Plani
      </span>
      <span className='text-red-500 font-serif text-[12px] font-normal font-weight-400'>
        Link{' '}
      </span>
      <span className='mobFont'>
        {t("home.PlaniLink plan your patient's treatment")}
      </span>
    </span>
  );

  return (
    <motion.div
      className='makeItPossibleMob'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='makeItPossibleMob__heading'>
        {t('home.How to make it possible')}
      </div>
      <div className='adjustment'>
        <img
          className='w-[46px] h-[412px] absolute top-[-8px]'
          src={line}
          alt='line'
        />
        <div className='makeItPossibleMob__pos1'>
          <Border number='1' content={t('home.Access to the planning area')} />
        </div>
        <div className='makeItPossibleMob__pos3'>
          <Border
            number='3'
            content={t('home.Send the stls, files and case goals')}
          />
        </div>
        <div className='makeItPossibleMob__pos5'>
          <Border
            number='5'
            content={t('home.Approve the case and receive the biomodels')}
          />
        </div>
        <div className='makeItPossibleMob__pos2'>
          <Border
            number='2'
            content={t('home.Choose the planning that suits your patient best')}
            isRight='1'
          />
        </div>
        <div className='makeItPossibleMob__pos4'>
          <Border number='4' content={palniLinkMob} isRight='1' />
        </div>
      </div>
    </motion.div>
  );
};

export default MakeItPossibleMobile;
