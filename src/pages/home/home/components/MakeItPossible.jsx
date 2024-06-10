import React from 'react';
import { useTranslation } from 'react-i18next';
import line from '../../../../assets/virticalLine.svg';

import Border from './Border';

const MakeItPossible = () => {
  const { t } = useTranslation();
  const palniLink = (
    <span>
      <h1 style={{ display: 'none' }}>planilink</h1>
      <span className='text-white font-serif text-[24px] font-normal font-weight-400 leading-180 text-2xl'>
        Plani
      </span>
      <span className='text-red-500 font-serif text-[24px] font-normal font-weight-400 leading-180 text-2xl'>
        Link{' '}
      </span>
      <span className='desktopFont'>
        {t("home.PlaniLink plan your patient's treatment")}
      </span>
    </span>
  );

  return (
    <>
      <div className='makeItPossible relative'>
        <div className='circlesGrad absolute top-[50%] translate-y-[-50%] right-[-4rem]' />
        <div className='circlesGrad absolute bottom-0  left-[-4rem]' />
        <div className='makeItPossible__container__heading z-20'>
          {t('home.How to make it possible')}
        </div>
        <div className='makeItPossible__container z-20'>
          <div className='makeItPossible__container__pos1'>
            <Border
              number='1'
              content={t('home.Access to the planning area')}
            />
          </div>
          <div className='makeItPossible__container__pos3'>
            <Border
              number='3'
              content={t('home.Send the stls, files and case goals')}
            />
          </div>
          <div className='makeItPossible__container__pos5'>
            <Border
              number='5'
              content={t('home.Approve the case and receive the biomodels')}
            />
          </div>
          <div className='makeItPossible__container__pos2'>
            <Border
              number='2'
              content={t(
                'home.Choose the planning that suits your patient best'
              )}
              isRight='1'
            />
          </div>
          <div className='makeItPossible__container__pos4'>
            <Border number='4' content={palniLink} isRight='1' />
          </div>
          <img className='absolute top-[200px]' src={line} alt='line' />
        </div>
      </div>
    </>
  );
};

export default MakeItPossible;
