import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';

import { getPlansForCompanyAPI } from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';
import { useNavigate } from 'react-router';
import { useGlobalStore } from '../../../../store/store';
import PlanningCard from './PlanningCard';
import { getUnreadNotificationsForCompanyAPI } from '../../../../apis/notificationAPIs';
import notificationRed from '../../../../assets/NotificationRed.svg';
import { planningStatuses } from '../../../../helpers/planning';

const PlansTable = ({ userSearchKeyword, patientSearchKeyword }) => {
  const { t } = useTranslation();
  const { setLoading, user } = useGlobalStore(state => state);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
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
      const response = await getUnreadNotificationsForCompanyAPI();

      if (response) {
        setUnreadNotifications(response.notifications);
        setUnreadNotificationPlannings(response.notificationPlans);
      }
    };
    getUnreadNotificationsCount();
  }, []);

  const getData = async forcedSkip => {
    const response = await getPlansForCompanyAPI({
      skip: forcedSkip || skip,
      limit,
      userSearchKeyword,
      patientSearchKeyword,
    });
    if (response) {
      setDocumentsCount(response?.documentsCount);
      setData([...response.plans]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [skip]);

  useEffect(() => {
    setSkip(0);
    getData(0);
  }, [userSearchKeyword, patientSearchKeyword]);

  return (
    <>
      {data.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable'>
          {data?.map(planning => (
            <PlanningCard
              planning={planning}
              key={planning?._id}
              unreadNotificationPlannings={unreadNotificationPlannings}
              unreadNotifications={unreadNotifications}
            />
          ))}

          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t(`table.user`)}</th>
                <th>{t(`table.patient`)}</th>
                <th>{t(`table.patientNumber`)}</th>
                <th>{t('table.planningStatus')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {row['_dentist']['name']}</td>
                  <td> {row['_patient']['name']}</td>
                  <td> {row['_patient']['patientNumber']}</td>
                  <td>
                    <span
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
                      {' '}
                      {planningStatuses.includes(row['status'])
                        ? t(`planningStatuses.${row['status']}`)
                        : row['status']}
                    </span>
                  </td>
                  <td className='flex gap-2'>
                    <SmButton
                      variant='small'
                      theme='primary'
                      title='See'
                      onClick={() =>
                        navigate(
                          `/company/plannings/patient-plans/${row._patient._id}`
                        )
                      }
                    />
                    {unreadNotifications.some(
                      not => not._patient === row['_patient']?._id
                    ) && (
                      <img src={notificationRed} className='w-[1rem]' alt='' />
                    )}
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
