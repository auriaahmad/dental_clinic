import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { planStatus2 } from '../../../../shared/variables';

const PlanningCard = ({ instruction, downloadFile }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.date')}</span>
          <span>{moment(instruction['createdAt']).format('MM/DD/YYYY')}</span>
          <span>
            {instruction['type'] === 'treatment'
              ? planStatus2.some(
                  status => status.title === instruction['changeStatus2']
                )
                ? t(`status2Option.${instruction['changeStatus2']}`)
                : instruction['changeStatus2'] || `-`
              : // `${t('instructions.Treatment Plan')} ${instruction['index']}`
                `${t('instructions.Records and written instructions')} ${
                  instruction['index']
                }`}
          </span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          {instruction['type'] === 'company' ? (
            <div className='flex gap-2'>
              <SmButton
                variant='small'
                theme='primary'
                title='View Report'
                onClick={() => downloadFile([instruction['treatmentFile']])}
              />
              <SmButton
                variant='small'
                theme='primary'
                title='See Simulation'
                onClick={() =>
                  window.open(
                    `${
                      instruction['copyLink'].includes('http')
                        ? instruction['copyLink']
                        : `http://${instruction['copyLink']}`
                    }`,
                    '_blank'
                  )
                }
              />
            </div>
          ) : instruction['type'] === 'treatment' ? (
            <div className='flex gap-2 justify-end'>
              {instruction['treatmentFile'] && (
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Report'
                  onClick={() => downloadFile([instruction['treatmentFile']])}
                />
              )}

              {instruction['copyLink'] && (
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Simulation'
                  onClick={() =>
                    window.open(
                      `${
                        instruction['copyLink'].includes('http')
                          ? instruction['copyLink']
                          : `http://${instruction['copyLink']}`
                      }`,
                      '_blank'
                    )
                  }
                  // onClick={() => downloadFile(row['files'])}
                />
              )}
              {instruction['files']?.length > 0 && (
                <SmButton
                  variant='small'
                  theme='primary'
                  title='See'
                  onClick={() => downloadFile(instruction['files'])}
                />
              )}
            </div>
          ) : (
            <div className='flex justify-end'>
              <SmButton
                variant='small'
                theme='primary'
                title='See'
                onClick={() =>
                  navigate(`/user/plannings/instructions/${instruction._id}`)
                }
                // onClick={() => downloadFile(row['files'])}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanningCard;
