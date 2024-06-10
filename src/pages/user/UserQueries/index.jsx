import React from 'react';
import Table from '../../../components/common/Table';
import { userQueriesMockData } from '../../../shared/mock';
import CInput from '../../../components/form/CInput';
import FWButton from '../../../components/form/FWButton';
import search from '../../../assets/searchRegular.svg';
import AddNewQueryModal from './components/AddNewQueryModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QueriesTable from './components/QueriesTable';
import useScreenSize from '../../../hooks/useResize';

const UserQueries = () => {
  const { t } = useTranslation();
  const [newQueryModalOpen, setNewQueryModalOpen] = useState(false);
  const closeNewQueryModal = () => setNewQueryModalOpen(false);

  const [queries, setQueries] = useState([]);

  const { width: screenWidth } = useScreenSize();

  return (
    <div className='billing'>
      <div className='billing__container'>
        <div className='heading-1'>
          <h1>{t('userQueries.Q')}</h1>
        </div>
      </div>
      <div className='queries__filters mb-8'>
        <div className='invisible'></div>
        <div className='queries__filters__button'>
          <FWButton
            title={t('queries.ANQ')}
            variant='theme'
            onClick={() => setNewQueryModalOpen(true)}
            style={{
              // height: screenWidth < 900 ? '2.5rem' : 'auto',
              width: screenWidth < 900 ? '8rem' : '100%',
            }}
          />
        </div>
      </div>

      <QueriesTable queries={queries} setQueries={setQueries} />
      <AddNewQueryModal
        open={newQueryModalOpen}
        queries={queries}
        setQueries={setQueries}
        handleClose={closeNewQueryModal}
      />
    </div>
  );
};

export default UserQueries;
