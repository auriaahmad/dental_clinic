import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useRef, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';
import { Buffer } from 'buffer';
import {
  deletePlanDraftAPI,
  getDentistPatientsAPI,
  markPlanAsPaidAPI,
  sendEmailsOnPlanCreationAPI,
} from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';
import { useNavigate } from 'react-router';
import { useGlobalStore } from '../../../../store/store';
import PlanningCard from './PlanningCard';
import { getUnreadNotificationsForDentistAPI } from '../../../../apis/notificationAPIs';
import notificationRed from '../../../../assets/NotificationRed.svg';
import { planningStatuses } from '../../../../helpers/planning';
import { pdf } from '@react-pdf/renderer';
import Invoice from '../../../../components/common/Invoice';

const PatientsTable = ({
  searchKeyword,
  data,
  setData,
  paymentSuccessful,
  latestBilling,
  setLatestBilling,
}) => {
  const { t } = useTranslation();
  const loadingRef = useRef();
  const navigate = useNavigate();
  const { setLoading, loading, user } = useGlobalStore(state => state);

  const sentEmailsRef = useRef();

  const [skip, setSkip] = useState(0);
  const [limit] = useState(20);
  const [documentsCount, setDocumentsCount] = useState(100);
  const [unreadNotificationPlannings, setUnreadNotificationPlannings] =
    useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const pageNumber = useMemo(
    () => Math.floor(skip / limit) + 1,
    [skip, limit, documentsCount]
  );
  const totalPages = useMemo(
    () => Math.ceil(documentsCount / limit),
    [skip, limit, documentsCount]
  );

  useEffect(() => {
    setLoading(true);
    const getUnreadNotificationsCount = async () => {
      const response = await getUnreadNotificationsForDentistAPI();

      if (response) {
        console.log(response);
        setUnreadNotifications(response.notifications);
        setUnreadNotificationPlannings(response.notificationPlans);
        setLoading(false);
      }
    };

    getUnreadNotificationsCount();
  }, []);

  const getData = async forcedSkip => {
    try {
      if (loading || loadingRef.current) return;
      loadingRef.current = true;

      const response = await getDentistPatientsAPI({
        skip: forcedSkip || skip,
        limit,
        searchKeyword,
      });

      setDocumentsCount(response.documentsCount);
      setLatestBilling(response?.billingOfLatestPlan);
      setData([...response.plans]);
    } catch (err) {
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    getData();
  }, [skip]);

  useEffect(() => {
    setSkip(0);
    getData(0);
  }, [searchKeyword]);

  // const markPaid = async (_plan, index) => {
  //   const response = await markPlanAsPaidAPI(_plan);
  //   if (response) {
  //     data[index].status = 'Waiting for planning';
  //     setData([...data]);
  //   }
  // };

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
    console.log(
      latestBilling,
      !latestBilling?.initialEmailsSent,
      paymentSuccessful
    );
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
              key={`${planning?._id}_${index}`}
              unreadNotificationPlannings={unreadNotificationPlannings}
              deleteDraft={deleteDraft}
              itemIndex={index}
              unreadNotifications={unreadNotifications}
            />
          ))}
          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t(`table.patient`)}</th>
                <th>{t(`table.patientNumber`)}</th>
                <th>{t(`table.planningStatus`)}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={`${row._id}_${rowIndex}` || rowIndex}>
                  <td> {row['_patient']?.['name'] || row['patientName']}</td>
                  <td> {row['_patient']?.['patientNumber'] || '-'}</td>
                  <td
                    className={`flex gap-2`}
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
                              `/user/plannings/patient-plans/${row._patient._id}`
                            );
                          else {
                            if (row['_patient'])
                              navigate(
                                `/user/plannings/new-plan/${row['_patient']._id}?draft=${row._id}`
                              );
                            else
                              navigate(
                                `/user/plannings/new-plan?draft=${row._id}`
                              );
                          }
                        }}
                      />
                      {/* {unreadNotificationPlannings.includes(row._id) && (
                        <img
                          src={notificationRed}
                          className='w-[1rem]'
                          alt=''
                        />
                      )} */}

                      {unreadNotifications.some(
                        not => not._patient === row['_patient']?._id
                      ) && (
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

export default PatientsTable;
