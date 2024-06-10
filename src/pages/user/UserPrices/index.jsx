import { useEffect, useState } from 'react';
import PlanCard from '../../../components/common/PlanCard';
import FWButton from '../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../../../store/store';
import { getPricingProductsForDentistAPI } from '../../../apis/pricingAPIs';

const UserPrices = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(1);

  const setLoading = useGlobalStore(state => state.setLoading);

  const [products, setProducts] = useState([]);
  const [complimentaryProducts, setComplimentaryProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await getPricingProductsForDentistAPI();

      if (response) {
        setProducts(response.products);
        setComplimentaryProducts(response.complementaryProducts);
      }
      setLoading(false);
    };
    getProducts();
  }, []);
  return (
    <div className='prices'>
      <h1 className='heading-1'>{t('userPrices.PP')}</h1>

      <div className='prices__plans__plans'>
        {products.length < 1 ? (
          <h1 className='heading-5'>{t('messages.noProductsAdded')}</h1>
        ) : (
          <>
            {products.map(product => (
              <div>
                <PlanCard id={product._id} product={product} />
              </div>
            ))}
          </>
        )}
      </div>
      <div className='changePlan__note mt-[2rem]'>
        <span>{t('userPrices.note')}</span>
      </div>

      <div className='prices__plans__footer'>
        {complimentaryProducts.map(cProduct => (
          <div className='mb-4'>
            <FWButton
              title={`${cProduct.product}: ${cProduct.price}€`}
              variant='whiteSky'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPrices;
