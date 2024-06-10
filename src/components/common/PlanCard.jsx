import checkTheme from '../../assets/checkTheme.svg';
import { useTranslation } from 'react-i18next';

const PlanCard = ({ selected, id, setSelected, product, title }) => {
  const { t } = useTranslation();

  return (
    <div
      className='planCard shadow-container'
      style={
        selected === id
          ? { background: '#F1FBFF', border: '1px solid #00B0F0' }
          : { cursor: 'pointer' }
      }
      onClick={() => setSelected && setSelected(id)}
    >
      <h2>
        {t('planCard.planningUpto')}
        <span className='color-sky'>
          {title || product?.product}
          {/* {t(
            product.product === 'more than 5 aligners'
              ? `planCard.aligners5`
              : product.product === 'more than 15 aligner'
              ? `planCard.aligners15`
              : `planCard.alignersMore`
          )} */}
        </span>
      </h2>

      <div className='planCard__features'>
        <div className='planCard__features__feature'>
          <img src={checkTheme} alt='' />
          <span>{t('planCard.SW')}</span>
        </div>
        <div className='planCard__features__feature'>
          <img src={checkTheme} alt='' />
          <span>{t('planCard.simulation')}</span>
        </div>
        <div className='planCard__features__feature'>
          <img src={checkTheme} alt='' />
          <span>{t('planCard.DWR')}</span>
        </div>
        <div className='planCard__features__feature'>
          <img src={checkTheme} alt='' />
          <span>{t('planCard.BM')}</span>
        </div>
      </div>
      <div className='planCard__additionalDets'>
        <h5 className='color-sky font-semibold'>{t('planCard.PAC')}</h5>
        <p>{product?.description}</p>
        {/* <span>{t('planCard.discount')}</span> */}
      </div>

      <div className='planCard__price'>
        <h1 className='text-[36px] font-semibold color-sky'>
          {product?.price}€
        </h1>
      </div>
    </div>
  );
};

export default PlanCard;
