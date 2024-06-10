import React, { useState } from 'react';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { createQueryAPI } from '../../../../apis/queryAPIs';
import { toast } from 'react-toastify';
import { useGlobalStore } from '../../../../store/store';
import { lang } from '../../../../shared/languages/lang';
import Loading from '../../../../components/common/Loading';

const AddNewQueryModal = ({ open, handleClose, setQueries }) => {
  const { t } = useTranslation();
  const language = useGlobalStore(state => state.lang);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    subject: '',
    note: '',
  });

  const changeHandler = event => {
    const { name, value } = event.target;
    setQuery(pS => ({
      ...pS,
      [name]: value,
    }));
  };

  const submitHandler = async event => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    const response = await createQueryAPI(query);
    if (response) {
      setQueries(pS => {
        return [response.query, ...pS];
      });
      toast(lang[language].success, { toastId: 1 });
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form
        className='modal flex flex-col p-[24px] w-[772] h-[428px]'
        onSubmit={submitHandler}
      >
        {!loading ? (
          <>
            <h2>{t('addNewQuery.ANQ')}</h2>
            <div className='flex space-x-[16px] pt-[44px]'>
              <CInput
                label={t('addNewQuery.QS')}
                name='subject'
                id='subject'
                onChange={changeHandler}
                required={true}
              />
            </div>
            <div className='pt-[20px]'>
              <CInput
                label={t('addNewQuery.N')}
                variant='textarea'
                style={{ height: '131px' }}
                textAreaHeight={{ height: '131px' }}
                name='note'
                id='note'
                onChange={changeHandler}
                required={true}
              />
            </div>
            <div className='flex justify-center'>
              <div className='w-[449px] pt-[44px]'>
                <FWButton title={t('addNewQuery.S')} variant='theme' />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </form>
    </Modal>
  );
};

export default AddNewQueryModal;
