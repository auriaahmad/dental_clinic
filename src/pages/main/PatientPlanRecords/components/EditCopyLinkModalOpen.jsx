import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import { useTranslation } from 'react-i18next';
import CInput from '../../../../components/form/CInput';
import { editTreatmentPlanForCompanyAPI } from '../../../../apis/plansAPI';
import { toast } from 'react-toastify';
import { useGlobalStore } from '../../../../store/store';
import FWButton from '../../../../components/form/FWButton';

const EditCopyLinkModalOpen = ({ open, handleClose, treatment, setData }) => {
  const { t } = useTranslation();
  const setLoading = useGlobalStore(state => state.setLoading);

  const [copyLink, setCopyLink] = useState('');

  useEffect(() => {
    setCopyLink(JSON.parse(JSON.stringify(treatment?.copyLink || '')));
  }, [treatment]);

  const changeHandler = event => setCopyLink(event.target.value);

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await editTreatmentPlanForCompanyAPI({
        _instruction: treatment._id,
        copyLink,
      });
      if (response) {
        setData(pS => {
          const instructionIndex = pS.findIndex(
            item => item._id === treatment._id
          );
          pS[instructionIndex] = response.instruction;
          return [...pS];
        });
        handleClose();
        toast(t('messages.simulationEdited'), { toastId: 1 });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} style={{ maxWidth: '350px' }}>
      <div className='modal'>
        <h2 className='mb-4'>{t('UploadPlanModal.editSimulation')}</h2>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <CInput
            name='copyLink'
            required={true}
            value={copyLink}
            onChange={changeHandler}
          />
          <FWButton title={t('buttons.Update')} variant='theme' />
        </form>
      </div>
    </Modal>
  );
};

export default EditCopyLinkModalOpen;
