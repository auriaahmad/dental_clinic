import { useEffect, useState } from 'react';
import PlanCard from '../../../components/common/PlanCard';
import FWButton from '../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import CreateNewProduct from './components/CreateNewProduct';
import EditProduct from './components/EditProduct';
import CreateComplementProduct from './components/CreateComplementProduct';
import EditProductComplement from './components/EditProductComplement';
import {
  deleteComplimentaryProductForCompanyAPI,
  deletePricingForCompanyAPI,
  getPricingProductsForCompanyAPI,
} from '../../../apis/pricingAPIs';
import { toast } from 'react-toastify';
import { useGlobalStore } from '../../../store/store';

const Prices = () => {
  const { t } = useTranslation();
  const setLoading = useGlobalStore(state => state.setLoading);

  const [selectedPlan, setSelectedPlan] = useState();
  const [productToEdit, setProductToEdit] = useState();
  const [complimentProductToEdit, setComplimentProductToEdit] = useState();

  const [createNewProduct, setCreateNewProduct] = useState(false);
  const closeCreateNewProduct = () => setCreateNewProduct(false);

  const [editProduct, setEditProduct] = useState(false);
  const closeEditProduct = () => {
    setEditProduct(false);
    setProductToEdit();
  };

  const [createComplementProduct, setCreateComplementProduct] = useState(false);
  const closeCreateComplementProduct = () => setCreateComplementProduct(false);

  const [editProductComplement, setEditProductComplement] = useState(false);
  const closeEditProductComplement = () => setEditProductComplement(false);

  const [products, setProducts] = useState([]);
  const [complimentaryProducts, setComplimentaryProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await getPricingProductsForCompanyAPI();

      if (response) {
        setProducts(response.products);
        setComplimentaryProducts(response.complementaryProducts);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  const deleteProduct = async _product => {
    setLoading(true);
    const response = await deletePricingForCompanyAPI(_product);
    if (response) {
      const productIndex = products.findIndex(item => item._id === _product);
      products.splice(productIndex, 1);
      setProducts([...products]);
      toast(t('messages.productDeleted'), { toastId: 1 });
    }
    setLoading(false);
  };

  const deleteComplimentaryProduct = async _cProduct => {
    setLoading(true);
    const response = await deleteComplimentaryProductForCompanyAPI(_cProduct);
    if (response) {
      const cProductIndex = complimentaryProducts.findIndex(
        item => item._id === _cProduct
      );
      complimentaryProducts.splice(cProductIndex, 1);
      setComplimentaryProducts([...complimentaryProducts]);
      toast(t('messages.success'), { toastId: 1 });
    }
    setLoading(false);
  };

  return (
    <div className='prices'>
      <div className='prices__headerContainer'>
        <h1 className='heading-1'>{t('prices.PP')}</h1>
        <div className='prices__headerContainer__button'>
          <div className='max-w-[205px] w-full'>
            <FWButton
              title={t('prices.CNP')}
              variant='theme'
              onClick={() => setCreateNewProduct(true)}
            />
          </div>
        </div>
        <CreateNewProduct
          open={createNewProduct}
          handleClose={closeCreateNewProduct}
          setProducts={setProducts}
        />
        <EditProduct
          open={editProduct}
          handleClose={closeEditProduct}
          productToEdit={productToEdit}
          setProducts={setProducts}
        />
      </div>
      <div className='prices__plans'>
        <div className='prices__plans__plans'>
          {products.length < 1 ? (
            <h1 className='heading-5'>{t('messages.noProductsAdded')}</h1>
          ) : (
            <>
              {products.map(product => (
                <div>
                  <PlanCard
                    selected={selectedPlan}
                    id={product._id}
                    setSelected={setSelectedPlan}
                    product={product}
                  />
                  <div className='prices__plans__plans__buttons'>
                    <FWButton
                      title={t('prices.E')}
                      variant='theme'
                      onClick={() => {
                        setProductToEdit(product);
                        setEditProduct(true);
                      }}
                    />
                    <FWButton
                      title={t('prices.D')}
                      variant='danger'
                      onClick={() => deleteProduct(product._id)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div></div>
        <div className='prices__plans__footer'>
          <h2 className='heading-2 mb-[6.5px] sm:block hidden'>
            {t('prices.CP')}
          </h2>
          {complimentaryProducts.map(cProduct => (
            <div className='mb-4'>
              <FWButton
                title={`${cProduct.product}: ${cProduct.price}€`}
                variant='white'
              />
              <div className='prices__plans__footer__button'>
                {/* editProductComplement */}
                <FWButton
                  title={t('prices.E')}
                  variant='theme'
                  onClick={() => {
                    setComplimentProductToEdit(cProduct);
                    setEditProductComplement(true);
                  }}
                />
                <FWButton
                  title={t('prices.D')}
                  variant='danger'
                  onClick={() => deleteComplimentaryProduct(cProduct._id)}
                />
              </div>
            </div>
          ))}
          <FWButton
            title={t('prices.addComp')}
            variant='white'
            onClick={() => setCreateComplementProduct(true)}
            style={{ marginTop: '1rem' }}
          />
          <EditProductComplement
            open={editProductComplement}
            handleClose={closeEditProductComplement}
            complimentProductToEdit={complimentProductToEdit}
            setComplimentaryProducts={setComplimentaryProducts}
          />
          <CreateComplementProduct
            open={createComplementProduct}
            handleClose={closeCreateComplementProduct}
            setComplimentaryProducts={setComplimentaryProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default Prices;
