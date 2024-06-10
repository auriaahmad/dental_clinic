import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';

import moment from 'moment';
import { getUserQueriesAPI } from '../../../../apis/queryAPIs';
import SmButton from '../../../../components/form/SmButton';
import Pagination from '../../../../components/common/Pagination';
import { useNavigate } from 'react-router';
import QueryCard from './QueryCard';
import { useGlobalStore } from '../../../../store/store';
import {
  getUnreadNotificationsForCompanyAPI,
  getUnreadNotificationsForDentistAPI,
} from '../../../../apis/notificationAPIs';
import { addEllipsis } from '../../../../helpers/general';

const QueriesTable = ({ queries, setQueries }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setLoading = useGlobalStore(state => state.setLoading);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [documentsCount, setDocumentsCount] = useState(100);

  const [queryNotifications, setQueryNotifications] = useState([]);

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
    const response = await getUserQueriesAPI();

    setDocumentsCount(response.documentsCount);
    setQueries([...response.queries]);
    setLoading(false);
  };

  const getUnreadNotifications = async () => {
    const response = await getUnreadNotificationsForDentistAPI();
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
                <th>{t(`table.date`)}</th>
                <th>{t('table.queryNumber')}</th>
                <th>{t('table.querySubject')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {queries?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>
                  <td> {row['queryNumber']}</td>
                  <td>
                    {' '}
                    <div className='flex gap-2 items-center'>
                      {addEllipsis(row['subject'], 25)}
                    </div>
                  </td>
                  <td>
                    <div className='flex gap-2 items-center'>
                      <SmButton
                        variant='small'
                        theme='primary'
                        title='See'
                        onClick={() => navigate(`/user/queries/${row._id}`)}
                      />
                      {queryNotifications.includes(row._id) && (
                        <i className='fa-regular fa-bell text-[1rem] text-[#00BBF4]'></i>
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

export default QueriesTable;
