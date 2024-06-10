import React, { useState } from 'react';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { createPricingAPI } from '../../../../apis/pricingAPIs';
import { toast } from 'react-toastify';

const CreateNewProduct = ({ open, handleClose, setProducts }) => {
  const { t } = useTranslation();

  const [pricing, setPricing] = useState({
    product: '',
    price: '',
    description: '',
    discount: '',
  });

  const changeHandler = event => {
    const { name, value } = event.target;
    setPricing(pS => ({ ...pS, [name]: value }));
  };

  const submitHandler = async event => {
    event.preventDefault();

    const response = await createPricingAPI(pricing);
    if (response) {
      toast(t('messages.productAdded'), { toastId: 1 });
      setPricing({
        product: '',
        price: '',
        description: '',
        discount: '',
      });
      setProducts(pS => [...pS, response.pricing]);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form className='modal flex flex-col' onSubmit={submitHandler}>
        <h2>{t('prices.CNP')}</h2>
        <div className='flex space-x-[16px] pt-6'>
          <CInput
            label={t('prices.Product')}
            name='product'
            required={true}
            onChange={changeHandler}
          />
          <CInput
            label={t('prices.Price')}
            name='price'
            required={true}
            onChange={changeHandler}
            type='number'
          />
        </div>
        <div className='pt-3'>
          <CInput
            label={t('prices.Discount')}
            name='discount'
            type='number'
            onChange={changeHandler}
          />
        </div>
        <div className="w-[auto] mt-[20px] text-slate-400 text-base font-normal font-['Inter'] leading-tight">
          Description
        </div>
        <textarea
          className='w-[auto] h-[131px] px-4 py-2 bg-white rounded-[32px] shadow border border-slate-100 justify-start items-center gap-1.5 inline-flex mt-[12px]  focus:outline-none'
          name='description'
          onChange={changeHandler}
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

export default CreateNewProduct;
