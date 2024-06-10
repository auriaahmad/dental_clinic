import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';

import {
  deletePlanForCompanyAPI,
  getPatientPlansForCompanyAPI,
} from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useGlobalStore } from '../../../../store/store';
import PlanningCard from './PlanningCard';
import { planningStatuses } from '../../../../helpers/planning';
import notificationRed from '../../../../assets/NotificationRed.svg';
import { getUnreadNotificationsForCompanyAPI } from '../../../../apis/notificationAPIs';

const PatientPlansTable = ({ data, setData, _patient, setPatient }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = useGlobalStore(state => state.lang);
  const setLoading = useGlobalStore(state => state.setLoading);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [documentsCount, setDocumentsCount] = useState(100);

  const [unreadNotificationPlannings, setUnreadNotificationPlannings] =
    useState([]);

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
    const response = await getPatientPlansForCompanyAPI({
      skip,
      limit,
      _patient,
    });
    if (response) {
      setDocumentsCount(response?.documentsCount);
      setData([...response.plans]);
      setPatient(response.patient);
      setLoading(false);
    }
  };

  const getUnreadNotificationsCount = async () => {
    const response = await getUnreadNotificationsForCompanyAPI();

    if (response) {
      setUnreadNotificationPlannings(response.notificationPlans);
    }
  };

  useEffect(() => {
    getUnreadNotificationsCount();
    getData();
  }, [skip]);

  const deletePlan = async _plan => {
    const confirm = window.confirm(
      lang === 'es' ? '¿Quieres eliminar esto?' : 'Do you want to delete this?'
    );
    if (!confirm) return;
    setLoading(true);
    const response = await deletePlanForCompanyAPI(_plan);
    if (response) {
      const filteredPlans = data.filter(item => item._id !== _plan);
      setData([...filteredPlans]);
      setLoading(false);
    }
  };

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
              deletePlan={deletePlan}
              unreadNotificationPlannings={unreadNotificationPlannings}
            />
          ))}

          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t('table.date')}</th>
                <th>{t(`table.planningNumber`)}</th>
                <th>{t(`table.product`)}</th>
                <th>{t('table.planningStatus')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>
                  <td> {row['planningNumber']}</td>
                  <td>
                    {' '}
                    {row['product']?.name ||
                      row['_product']?.['product'] ||
                      '-'}
                    {/* {row['_patient']?.products?.find(
                      prod => prod._product === row['_product']?._id
                    )?.productName || row['_product']['product']} */}
                  </td>
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
                          `/company/plannings/patient-plan-record/${row._id}`
                        )
                      }
                    />
                    <SmButton
                      variant='small'
                      theme='danger'
                      title='Delete'
                      onClick={() => deletePlan(row._id)}
                    />
                    {unreadNotificationPlannings.includes(row._id) && (
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

export default PatientPlansTable;
