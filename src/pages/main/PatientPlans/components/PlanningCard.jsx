import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { planningStatuses } from '../../../../helpers/planning';
import notificationRed from '../../../../assets/NotificationRed.svg';

const PlanningCard = ({
  planning,
  deletePlan,
  unreadNotificationPlannings,
}) => {
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
          <span>{t('table.patientNumber')}</span>
          <span>{planning['planningNumber']}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.product')}</span>
          <span>
            {planning['product']?.name ||
              planning['_product']?.['product'] ||
              '-'}
            {/* {planning['_product']['product']} */}
          </span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.planningStatus')}</span>
          <span
            className='capitalize text-[#00B0F0]'
            style={{
              color:
                planning['status'] === 'Pending payment'
                  ? 'orange'
                  : planning['status'] !==
                    'Planning pending sending to Planilink'
                  ? '#00BBF4'
                  : 'red',
            }}
          >
            {planningStatuses.includes(planning['status'])
              ? planning['status']
              : planning['status']}
          </span>
        </div>
      </div>
      <div className='planningCard__right flex-col gap-2 items-center'>
        <SmButton
          variant='small'
          theme='primary'
          title='See'
          onClick={() =>
            navigate(`/company/plannings/patient-plan-record/${planning._id}`)
          }
        />
        <SmButton
          variant='small'
          theme='danger'
          title='Delete'
          onClick={() => deletePlan(planning._id)}
        />
        {unreadNotificationPlannings.includes(planning._id) && (
          <img src={notificationRed} className='w-[1rem]' alt='' />
        )}
      </div>
    </div>
  );
};

export default PlanningCard;
