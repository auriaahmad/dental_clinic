import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { editPricingNameForCompanyAPI } from '../../../../apis/pricingAPIs';
import Loading from '../../../../components/common/Loading';

const ChangeProductModal = ({ open, handleClose, plan, setPlan }) => {
  const { t } = useTranslation();

  const [productToUpdate, setProductToUpdate] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plan) {
      setProductToUpdate(
        JSON.parse(
          JSON.stringify({
            _id: plan._product._id,
            product: plan?.product?.name || plan._product.product,
            _patient: plan._patient._id,
            _plan: plan._id,
          })
        )
      );
    }
  }, [plan]);

  const changeHandler = event => {
    setProductToUpdate(pS => ({ ...pS, product: event.target.value }));
  };

  const submitHandler = async () => {
    setLoading(true);
    const response = await editPricingNameForCompanyAPI(productToUpdate);
    if (response) {
      setPlan(pS => ({
        ...pS,
        product: { name: productToUpdate.product },
        _patient: response.patient,
      }));
    }
    setLoading(false);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className='modal flex flex-col gap-[2.75rem]'>
        {loading ? (
          <div className='min-h-[5rem]'>
            <Loading isSmall={true} />
          </div>
        ) : (
          <>
            <h2>{t('changeProductModel.changeProduct')}</h2>
            <CInput
              placeholder={t('changeProductModel.writeManually')}
              value={productToUpdate?.product}
              onChange={changeHandler}
            />
            <div className='flex justify-center'>
              <div className='w-[25rem]'>
                <FWButton
                  title={t('changeProductModel.save')}
                  variant='theme'
                  onClick={submitHandler}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ChangeProductModal;
