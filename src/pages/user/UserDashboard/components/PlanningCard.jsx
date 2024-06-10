import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import notificationRed from '../../../../assets/NotificationRed.svg';
import { planningStatuses } from '../../../../helpers/planning';

const PlanningCard = ({
  planning,
  unreadNotificationPlannings,
  deleteDraft,
  itemIndex,
  unreadNotifications,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.patient')}</span>
          <span>
            {planning['_patient']?.['name'] || planning['patientName']}
          </span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.patientNumber')}</span>
          <span>{planning['_patient']?.['patientNumber'] || '-'}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.patient')}</span>
          <span
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
          </span>
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
              // return console.log(planning, '<,,');
              if (
                planning['status'] !== 'Planning pending sending to Planilink'
              ) {
                navigate(
                  `/user/plannings/patient-plans/${planning._patient._id}`
                );
              } else {
                if (planning['_patient']) {
                  return navigate(
                    `/user/plannings/new-plan/${planning['_patient']._id}?draft=${planning._id}`
                  );
                }

                navigate(`/user/plannings/new-plan?draft=${planning._id}`);
              }
            }}
          />
          {unreadNotifications.some(
            not => not._patient === planning['_patient']?._id
          ) && <img src={notificationRed} className='w-[1rem]' alt='' />}
        </div>
      </div>
    </div>
  );
};

export default PlanningCard;
