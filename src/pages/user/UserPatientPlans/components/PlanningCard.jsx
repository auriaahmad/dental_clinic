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
  deleteDraft,
  itemIndex,
  markPaid,
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
          <span>{planning['planningNumber'] || '-'}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.product')}</span>
          <span>
            {' '}
            {planning['product']?.name ||
              planning?.['_product']?.['product'] ||
              '-'}
          </span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.planningStatus')}</span>
          {console.log(planning['status'])}
          <div
            className='capitalize flex gap-2 items-center'
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
            {planningStatuses?.includes(planning['status'])
              ? t(`planningStatuses.${planning['status']}`)
              : planning['status']}

            {/* {planning['status'] === 'Pending payment' && (
              <SmButton
                variant='small'
                theme='yellow'
                titleComplete={t(`planningStatuses.${planning['status']}`)}
                onClick={() => markPaid(planning._id, itemIndex)}
                style={{ fontSize: '0.8rem', alignItems: 'center' }}
              />
            )} */}
          </div>
        </div>
      </div>
      <div className='planningCard__right'>
        <div className='mt-2 flex-col flex items-center gap-2'>
          {planning['status'] === 'Planning pending sending to Planilink' && (
            <SmButton
              variant='small'
              theme='danger'
              title='Delete'
              onClick={() => {
                deleteDraft(planning._id, itemIndex);
              }}
            />
          )}
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            onClick={() => {
              if (
                planning['status'] !== 'Planning pending sending to Planilink'
              )
                navigate(
                  `/user/plannings/patient-plan-treatments/${planning._id}`
                );
              else {
                navigate(
                  `/user/plannings/new-plan/${planning['_patient']._id}?draft=${planning._id}`
                );
              }
            }}
          />
          {unreadNotificationPlannings.includes(planning?._id) && (
            <img src={notificationRed} className='w-[1rem]' alt='' />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanningCard;
