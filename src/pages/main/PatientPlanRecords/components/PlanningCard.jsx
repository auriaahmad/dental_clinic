import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { planStatus2 } from '../../../../shared/variables';

const PlanningCard = ({
  instruction,
  downloadFile,
  setSelectedTreatment,
  fileRef,
  setEditCopyLinkModalOpen,
  deleteTreatmentPlan,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.date')}</span>
          <span>{moment(instruction['createdAt']).format('MM/DD/YYYY')}</span>
          <span>
            {instruction['insType'] === 'treatment'
              ? planStatus2.some(
                  status => status.title === instruction['changeStatus2']
                )
                ? t(`status2Option.${instruction['changeStatus2']}`)
                : instruction['changeStatus2'] || `-`
              : // `${t('instructions.Treatment Plan')} ${instruction['index']}`
                `${t('instructions.Records and written instructions')} ${
                  instruction['index']
                }`}
            {/* {instruction['instructions'] || instruction['changeStatus2']} */}
          </span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          {instruction['type'] === 'company' ? (
            <div
              className='flex gap-1 flex-wrap justify-end'
              style={{ alignItems: 'flex-end' }}
            >
              {instruction['treatmentFile'] && (
                <SmButton
                  variant='small'
                  theme='primary'
                  title='View Report'
                  onClick={() => downloadFile([instruction['treatmentFile']])}
                />
              )}
              {instruction['treatmentFile'] && (
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Edit Report'
                  onClick={() => {
                    setSelectedTreatment(instruction);
                    fileRef.current.click();
                  }}
                />
              )}

              {instruction['copyLink'] && (
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
              )}

              {instruction['copyLink'] && (
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Edit Simulation'
                  onClick={() => {
                    setSelectedTreatment(instruction);
                    setEditCopyLinkModalOpen(true);
                  }}
                />
              )}

              <SmButton
                variant='small'
                theme='danger'
                title='Delete'
                onClick={() => deleteTreatmentPlan(instruction['_id'])}
              />
            </div>
          ) : (
            <div className='flex justify-end '>
              <SmButton
                variant='small'
                theme='primary'
                title='See'
                onClick={() => {
                  downloadFile(instruction['files']);
                  navigate(
                    `/company/plannings/instructions/${instruction._id}`
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* <div className='planningCard__right'>
        <SmButton
          variant='small'
          theme='primary'
          title='See'
          onClick={() =>
            navigate(
              `/company/plannings/patient-plans/${instruction._patient._id}`
            )
          }
        />
      </div> */}
    </div>
  );
};

export default PlanningCard;
