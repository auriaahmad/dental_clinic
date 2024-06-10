import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { editComplimentaryProductForCompanyAPI } from '../../../../apis/pricingAPIs';
import { toast } from 'react-toastify';

const EditProductComplement = ({
  open,
  handleClose,
  complimentProductToEdit,
  setComplimentaryProducts,
}) => {
  const [complimentaryProduct, setComplimentaryProduct] = useState();

  useEffect(() => {
    if (complimentProductToEdit)
      setComplimentaryProduct(
        JSON.parse(JSON.stringify(complimentProductToEdit))
      );
  }, [complimentProductToEdit]);

  const { t } = useTranslation();

  const changeHandler = event => {
    const { name, value } = event.target;
    setComplimentaryProduct(pS => ({ ...pS, [name]: value }));
  };

  const submitHandler = async event => {
    event.preventDefault();

    const response = await editComplimentaryProductForCompanyAPI(
      complimentaryProduct
    );
    if (response) {
      setComplimentaryProducts(pS => {
        const cProductIndex = pS.findIndex(
          item => item._id === complimentaryProduct._id
        );
        pS[cProductIndex] = response.complimentaryProduct;
        return [...pS];
      });

      toast(t('messages.success'), { toastId: 1 });
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form className='modal flex flex-col' onSubmit={submitHandler}>
        <h2>{t('prices.EPC')}</h2>
        <div className='flex space-x-[16px] pt-6'>
          <CInput
            label={t('prices.Product')}
            name='product'
            required={true}
            onChange={changeHandler}
            value={complimentaryProduct?.product}
          />
          <CInput
            label={t('prices.Price')}
            name='price'
            type='number'
            required={true}
            onChange={changeHandler}
            value={complimentaryProduct?.price}
          />
        </div>
        <div className="w-[auto] mt-[20px] text-slate-400 text-base font-normal font-['Inter'] leading-tight">
          {t('prices.Description')}
        </div>
        <textarea
          className='w-[auto] h-[131px] px-4 py-2 bg-white rounded-[32px] shadow border border-slate-100 justify-start items-center gap-1.5 inline-flex mt-[12px]  focus:outline-none'
          name='description'
          onChange={changeHandler}
          value={complimentaryProduct?.description}
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

export default EditProductComplement;
