import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import notificationRed from '../../../../assets/NotificationRed.svg';
import { planningStatuses } from '../../../../helpers/planning';

const PlanningCard = ({
  planning,
  unreadNotificationPlannings,
  unreadNotifications,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.user')}</span>
          <span>{planning['_dentist']['name']}</span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.patient')}</span>
          <span>{planning['_patient']['name']}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.patientNumber')}</span>
          <span>{planning['_patient']['patientNumber']}</span>
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
              ? t(`planningStatuses.${planning['status']}`)
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
            navigate(
              `/company/plannings/patient-plans/${planning._patient._id}`
            )
          }
        />
        {unreadNotifications.some(
          not => not._patient === planning['_patient']?._id
        ) && <img src={notificationRed} className='w-[1rem]' alt='' />}
      </div>
    </div>
  );
};

export default PlanningCard;
