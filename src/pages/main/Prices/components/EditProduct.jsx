import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { editPricingForCompanyAPI } from '../../../../apis/pricingAPIs';
import { toast } from 'react-toastify';

const EditProduct = ({ open, handleClose, productToEdit, setProducts }) => {
  const { t } = useTranslation();

  const [product, setProduct] = useState();

  useEffect(() => {
    if (productToEdit) setProduct(JSON.parse(JSON.stringify(productToEdit)));
  }, [productToEdit]);

  const changeHandler = event => {
    const { name, value } = event.target;
    setProduct(pS => ({ ...pS, [name]: value }));
  };

  const submitHandler = async event => {
    event.preventDefault();

    const response = await editPricingForCompanyAPI({ ...product });
    if (response) {
      setProducts(pS => {
        const productIndex = pS.findIndex(item => item._id === product._id);
        pS[productIndex] = response.pricing;
        return [...pS];
      });
      toast(t('messages.productUpdated'), { toastId: 1 });
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form className='modal flex flex-col' onSubmit={submitHandler}>
        <h2>{t('prices.EP')}</h2>
        <div className='flex space-x-[16px] pt-6'>
          <CInput
            label={t('prices.Product')}
            name='product'
            required={true}
            onChange={changeHandler}
            value={product?.product}
          />
          <CInput
            label={t('prices.Price')}
            name='price'
            required={true}
            onChange={changeHandler}
            type='number'
            value={product?.price}
          />
        </div>
        <div className='pt-3'>
          <CInput
            label={t('prices.Discount')}
            name='discount'
            type='number'
            onChange={changeHandler}
            value={product?.discount}
          />
        </div>
        <div className="w-[auto] mt-[20px] text-slate-400 text-base font-normal font-['Inter'] leading-tight">
          Description
        </div>
        <textarea
          className='w-[auto] h-[131px] px-4 py-2 bg-white rounded-[32px] shadow border border-slate-100 justify-start items-center gap-1.5 inline-flex mt-[12px]  focus:outline-none'
          name='description'
          onChange={changeHandler}
          value={product?.description}
        ></textarea>
        <div className='flex justify-center mt-5'>
          <div className='w-[449px]'>
            <FWButton title={t('prices.U&S')} variant='theme' />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProduct;
