import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import CInput from '../../../../components/form/CInput';
import FWButton from '../../../../components/form/FWButton';
import { useTranslation } from 'react-i18next';
import { getAllDentistsForCompanyAPI } from '../../../../apis/userAPIs';
import CMenu from '../../../../components/form/CMenu';
import { createQueryForCompanyAPI } from '../../../../apis/queryAPIs';
import useScreenSize from '../../../../hooks/useResize';
import Loading from '../../../../components/common/Loading';

const AddNewQueryModal = ({ open, handleClose, setQueries }) => {
  const { t } = useTranslation();
  const [dentists, setDentists] = useState();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState();
  const [subject, setSubject] = useState('');
  const [note, setNote] = useState('');

  const { width: screenWidth } = useScreenSize();

  useEffect(() => {
    const getDentists = async () => {
      const response = await getAllDentistsForCompanyAPI();
      if (response) {
        setDentists([...response.users]);
      }
    };
    getDentists();
  }, []);

  const submitHandler = async event => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    const response = await createQueryForCompanyAPI({
      _user: user,
      note,
      subject,
    });
    if (response) {
      setQueries(pS => [response.query, ...pS]);
      // toast(lang[language].success);
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form className='modal flex flex-col' onSubmit={submitHandler}>
        {loading && <Loading />}
        <h2>{t('addNewQuery.ANQ')}</h2>
        <div className='flex sm:flex-row flex-col sm:space-x-[16px] pt-6'>
          <CMenu
            style={{ maxWidth: screenWidth > 640 ? '48%' : '100%' }}
            value={user}
            setValue={setUser}
            label={t('addNewQuery.SU')}
            options={dentists}
            noCustomInput={true}
            panelStyle={{ maxHeight: '350px', overflowY: 'auto' }}
          />

          <CInput
            label={t('addNewQuery.QS')}
            required={true}
            onChange={e => setSubject(e.target.value)}
          />
        </div>
        <div className="w-[auto] mt-[10px] text-[0.75rem] sm:text-[1rem] sm:mt-[20px] text-slate-400 text-base font-normal font-['Inter'] leading-tight">
          Note
        </div>
        <textarea
          className='w-[auto] h-[131px] px-4 py-2 bg-white rounded-[32px] shadow border border-slate-100 justify-start items-center gap-1.5 inline-flex mt-[12px]  focus:outline-none'
          required
          onChange={e => setNote(e.target.value)}
        ></textarea>
        <div className='flex justify-center mt-5'>
          <div className='w-[449px]'>
            <FWButton title={t('addNewQuery.S')} variant='theme' />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewQueryModal;
