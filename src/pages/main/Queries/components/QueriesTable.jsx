import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';

import {
  deletePlanForCompanyAPI,
  getPatientPlansForCompanyAPI,
  getUserQueriesForCompanyAPI,
} from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';
import { toast } from 'react-toastify';
import { deleteQueryForCompanyAPI } from '../../../../apis/queryAPIs';
import QueryCard from './QueryCard';
import { useGlobalStore } from '../../../../store/store';
import { getUnreadNotificationsForCompanyAPI } from '../../../../apis/notificationAPIs';
import { addEllipsis } from '../../../../helpers/general';

const QueriesTable = ({ queries, setQueries }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setLoading = useGlobalStore(state => state.setLoading);

  const [queryNotifications, setQueryNotifications] = useState([]);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
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
    const response = await getUserQueriesForCompanyAPI({
      skip,
      limit,
    });
    if (response) {
      setDocumentsCount(response?.documentsCount);
      setQueries([...response.queries]);
      setLoading(false);
    }
  };

  const getUnreadNotifications = async () => {
    const response = await getUnreadNotificationsForCompanyAPI();
    if (response) {
      let nots = response.queryNotifications.map(item => item._query);

      setQueryNotifications(nots);
    }
  };

  useEffect(() => {
    getUnreadNotifications();
  }, []);

  useEffect(() => {
    getData();
  }, [skip]);

  const deleteQuery = async _query => {
    const response = await deleteQueryForCompanyAPI(_query);
    if (response) {
      const filteredQueries = queries.filter(item => item._id !== _query);
      setQueries([...filteredQueries]);
    }
  };

  return (
    <>
      {queries.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable'>
          {queries?.map(query => (
            <QueryCard
              query={query}
              key={query?._id}
              queryNotifications={queryNotifications}
            />
          ))}
          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t('table.date')}</th>
                <th>{t('table.queryNumber')}</th>
                <th>{t('table.user')}</th>
                <th>{t('table.status')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {queries?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>
                  <td> {row['queryNumber']}</td>
                  <td> {row['_user']?.['name']}</td>
                  <td>
                    <div className='flex gap-2 items-center'>
                      {addEllipsis(row['subject'], 25)}
                    </div>
                  </td>
                  <td className='flex gap-2'>
                    <SmButton
                      variant='small'
                      theme='primary'
                      title='See'
                      onClick={() => navigate(`/company/queries/${row._id}`)}
                    />
                    <SmButton
                      variant='small'
                      theme='danger'
                      title='Delete'
                      onClick={() => deleteQuery(row._id)}
                    />
                    {queryNotifications.includes(row._id) && (
                      <i className='fa-regular fa-bell text-[1rem] text-[#00BBF4]'></i>
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

export default QueriesTable;
