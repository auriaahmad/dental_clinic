import CInput from '../../../components/form/CInput';
import search from '../../../assets/searchRegular.svg';
import Table from '../../../components/common/Table';
import { usersMockData } from '../../../shared/mock';
import { useTranslation } from 'react-i18next';
import UsersTable from './components/UsersTable';
import { useState } from 'react';

const Users = () => {
  const { t } = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className='users'>
      <div className='users__header'>
        <h1 className='heading-1'>{t('users.users')}</h1>
      </div>
      <div className='users__filters'>
        <div className='users__filters__input'>
          <CInput
            label={t('users.SbU')}
            placeholder={t('users.S')}
            icon={search}
            onChange={e => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>
      <UsersTable searchKeyword={searchKeyword} />
    </div>
  );
};

export default Users;
