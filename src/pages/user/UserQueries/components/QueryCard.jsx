import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const QueryCard = ({ query, deleteQuery, queryNotifications }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function addEllipsis(word) {
    if (word.length > 15) {
      return word.slice(0, 15) + '...';
    }
    return word;
  }

  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.date')}</span>
          <span>{moment(query['createdAt']).format('MM/DD/YYYY')}</span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.userNumber')}</span>
          <span>{query['queryNumber']}</span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.querySubject')}</span>
          <span>{addEllipsis(query['subject'])}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <div className='flex gap-1 mt-2 flex-wrap justify-end'>
            <SmButton
              variant='small'
              theme='primary'
              title='See'
              onClick={() => navigate(`/user/queries/${query._id}`)}
            />
          </div>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.user')}</span>
          <span>{query['_user']?.['name']}</span>
        </div>
        <div className='planningCard__col__item'>
          <div className='planningCard__col__item'>
            {queryNotifications.includes(query._id) && (
              <i className='fa-regular fa-bell text-[1rem] text-[#00BBF4]'></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryCard;
