import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const PlanningCard = ({ planning }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.date')}</span>
          <span>{moment(planning['createdAt']).format('MM/DD/YYYY')}</span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.patient')}</span>
          <span>{planning['_patient']?.['name']}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.planningStatus')}</span>
          <span className='capitalize text-[#00B0F0]'>
            {planning['status']}
          </span>
        </div>
      </div>
      <div className='planningCard__right'>
        <SmButton
          variant='small'
          theme='primary'
          title='See'
          onClick={() =>
            navigate(`/company/plannings/patient-plan-record/${planning._id}`)
          }
        />
      </div>
    </div>
  );
};

export default PlanningCard;
