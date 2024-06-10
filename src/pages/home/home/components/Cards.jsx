import checkTheme from '../../../../assets/checkHome.svg';
import { useTranslation } from 'react-i18next';
const Cards = ({ title, discount }) => {
  const { t } = useTranslation();

  return (
    <div className='planCardContainer'>
      <div className='planCardContainer__inner'>
        <div className='planCardHome shadow-container'>
          <h2 className='planCardHome__heading'>
            {t('planCard.planningUpto')}
            <span className='color-sky'>{title}</span>
          </h2>
          <div className='line'></div>
          <div className='planCardHome__features'>
            <div className='planCardHome__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.SW')}
            </div>
            <div className='planCardHome__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.simulation')}
            </div>
            <div className='planCardHome__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.DWR')}
            </div>
            <div className='planCardHome__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.BM')}
            </div>
          </div>
          <div className='line'></div>
          <div className='planCardHome__additionalDets'>
            <h5 className='color-sky font-semibold'>{t('planCard.PAC')}</h5>
            <p>{t('planCard.RCB')}</p>
            {/* <div className='planCardHome__additionalDets__dis'>
              {discount} {t('planCard.discount')}
            </div> */}
          </div>
        </div>

        <div className='planCardHomeMob shadow-container'>
          <h2 className='planCardHomeMob__heading'>
            {t('planCard.planningUpto')}
            <span className='color-sky'>{title}</span>
          </h2>
          <div className='line'></div>
          <div className='planCardHomeMob__features'>
            <div className='planCardHomeMob__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.SW')}
            </div>
            <div className='planCardHomeMob__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.simulation')}
            </div>
            <div className='planCardHomeMob__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.DWR')}
            </div>
            <div className='planCardHomeMob__features__feature'>
              <img src={checkTheme} alt='' />
              {t('planCard.BM')}
            </div>
          </div>
          <div className='line'></div>
          <div className='planCardHomeMob__additionalDets'>
            <h5 className='color-sky font-semibold'>{t('planCard.PAC')}</h5>
            <p>{t('planCard.RCB')}</p>
            {/* <div className='planCardHomeMob__additionalDets__dis'>
              {discount} {t('planCard.discount')}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
