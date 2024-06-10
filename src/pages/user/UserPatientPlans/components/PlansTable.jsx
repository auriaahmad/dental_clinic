import { useTranslation } from 'react-i18next';
import { Buffer } from 'buffer';
import { useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import SmButton from '../../../../components/form/SmButton';

import {
  deletePlanDraftAPI,
  getPatientPlansAPI,
  markPlanAsPaidAPI,
  sendEmailsOnPlanCreationAPI,
} from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';
import { useLocation, useNavigate } from 'react-router';
import PlanningCard from './PlanningCard';
import { useGlobalStore } from '../../../../store/store';
import { planningStatuses } from '../../../../helpers/planning';
import { getUnreadNotificationsForDentistAPI } from '../../../../apis/notificationAPIs';
import notificationRed from '../../../../assets/NotificationRed.svg';
import { pdf } from '@react-pdf/renderer';
import Invoice from '../../../../components/common/Invoice';

const PlansTable = ({
  setPatient,
  setNewPlanAllowed,
  paymentSuccessful,
  latestBilling,
  setLatestBilling,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const sentEmailsRef = useRef();

  const { setLoading, user } = useGlobalStore(state => state);

  const [data, setData] = useState([]);
  const [unreadNotificationPlannings, setUnreadNotificationPlannings] =
    useState([]);

  const [skip, setSkip] = useState(0);
  const [limit] = useState(20);
  const [documentsCount, setDocumentsCount] = useState(100);

  const pageNumber = useMemo(
    () => Math.floor(skip / limit) + 1,
    [skip, limit, documentsCount]
  );
  const totalPages = useMemo(
    () => Math.ceil(documentsCount / limit),
    [skip, limit, documentsCount]
  );

  const getData = async () => {
    setLoading(true);
    const splittedLoc = location.pathname.split('/');
    const _patient = splittedLoc[splittedLoc.length - 1];
    const response = await getPatientPlansAPI({
      skip,
      limit,
      _patient,
    });

    if (response) {
      setNewPlanAllowed(response.newPlanAllowed);
      setDocumentsCount(response.documentsCount);
      setPatient(response.patient);
      setLatestBilling(response.billingOfLatestPlan);
      setData([...response.plans]);
    }
    setLoading(false);
  };

  const getUnreadNotificationsCount = async () => {
    const response = await getUnreadNotificationsForDentistAPI();

    if (response) {
      setUnreadNotificationPlannings(response.notificationPlans);
    }
  };

  useEffect(() => {
    getUnreadNotificationsCount();
    getData();
  }, [skip]);

  const markPaid = async (_plan, index) => {
    const response = await markPlanAsPaidAPI(_plan);
    if (response) {
      data[index].status = 'Waiting for planning';
      setData([...data]);
    }
  };

  const deleteDraft = async (_draft, index) => {
    const confirm = window.confirm(
      user.lang === 'es' ? 'Estas seguro' : 'Are you sure?'
    );
    if (!confirm) return;
    const response = await deletePlanDraftAPI(_draft);
    if (response) {
      data.splice(index, 1);
      setData([...data]);
    }
  };

  useEffect(() => {
    const sendEmailsOnNewPlanning = async () => {
      if (sentEmailsRef.current) return;
      sentEmailsRef.current = true;

      // return;
      const file = await pdf(
        <Invoice invoice={latestBilling} user={user} />
      ).toBlob();

      const base64Pdf = await file
        .arrayBuffer()
        .then(buffer => Buffer.from(buffer).toString('base64'));

      await sendEmailsOnPlanCreationAPI({
        _billing: latestBilling._id,
        attachment: base64Pdf,
      });
    };

    if (latestBilling && !latestBilling?.initialEmailsSent && paymentSuccessful)
      sendEmailsOnNewPlanning();
  }, [latestBilling, paymentSuccessful]);

  return (
    <>
      {data.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable'>
          {data?.map((planning, index) => (
            <PlanningCard
              planning={planning}
              key={planning?._id}
              unreadNotificationPlannings={unreadNotificationPlannings}
              deleteDraft={deleteDraft}
              itemIndex={index}
              markPaid={markPaid}
            />
          ))}
          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t(`table.date`)}</th>
                <th>{t(`table.planning`)}</th>
                <th>{t(`table.product`)}</th>
                <th>{t(`table.planningStatus`)}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>
                  <td> {row['planningNumber'] || '-'}</td>
                  <td>
                    {' '}
                    {row['product']?.name ||
                      row?.['_product']?.['product'] ||
                      '-'}
                    {/* {row['_patient']?.products?.find(
                      prod => prod?._product === row['_product']?._id
                    )?.productName ||
                      row?.['_product']?.['product'] ||
                      '-'} */}
                  </td>
                  <td className='flex gap-2'>
                    <span
                      className='capitalize'
                      style={{
                        color:
                          row['status'] === 'Pending payment'
                            ? 'orange'
                            : row['status'] !==
                              'Planning pending sending to Planilink'
                            ? '#00BBF4'
                            : 'red',
                      }}
                    >
                      {planningStatuses?.includes(row['status'])
                        ? t(`planningStatuses.${row['status']}`)
                        : row['status']}
                    </span>
                    {/* {row['status'] === 'Pending payment' && (
                      <SmButton
                        variant='small'
                        theme='yellow'
                        titleComplete={t(`planningStatuses.${row['status']}`)}
                        onClick={() => markPaid(row._id, rowIndex)}
                      />
                    )} */}
                  </td>
                  <td>
                    <div className='flex gap-2 justify-end'>
                      {row['status'] ===
                        'Planning pending sending to Planilink' && (
                        <SmButton
                          variant='small'
                          theme='danger'
                          title='Delete'
                          onClick={() => {
                            deleteDraft(row._id, rowIndex);
                          }}
                        />
                      )}
                      <SmButton
                        variant='small'
                        theme='primary'
                        title='See'
                        onClick={() => {
                          if (
                            row['status'] !==
                            'Planning pending sending to Planilink'
                          )
                            navigate(
                              `/user/plannings/patient-plan-treatments/${row._id}`
                            );
                          else {
                            navigate(
                              `/user/plannings/new-plan/${row['_patient']._id}?draft=${row._id}`
                            );
                          }
                        }}
                        style={{ minWidth: '2.5rem' }}
                      />
                      {unreadNotificationPlannings.includes(row._id) && (
                        <img
                          src={notificationRed}
                          className='w-[1rem]'
                          alt=''
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalPages={totalPages}
            pageNumber={pageNumber}
            skip={skip}
            limit={limit}
            setSkip={setSkip}
          />
        </div>
      )}
    </>
  );
};

export default PlansTable;
