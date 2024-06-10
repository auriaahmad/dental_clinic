import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const UserCard = ({ user, downloadInvoice, deleteInvoice }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.user')}</span>
          <span>{user['name']}</span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.userNumber')}</span>
          <span>{user['userNumber']}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <div className='flex gap-1 mt-2 flex-wrap justify-end'>
            <SmButton
              variant='small'
              theme='primary'
              title='View Profile'
              onClick={() => navigate(`/company/users/profile/${user._id}`)}
              style={{ maxHeight: '1.5rem', height: '100%' }}
            />
            <SmButton
              variant='small'
              theme='primary'
              title='See Plannings'
              onClick={() => navigate(`/company/users/user-plans/${user._id}`)}
              style={{ maxHeight: '1.5rem', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
