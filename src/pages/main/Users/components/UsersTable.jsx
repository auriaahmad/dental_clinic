import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';
import Pagination from '../../../../components/common/Pagination';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';
import { getUsersForCompanyAPI } from '../../../../apis/userAPIs';
import UserCard from './UserCard';
import { useGlobalStore } from '../../../../store/store';

const UsersTable = ({ searchKeyword }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setLoading = useGlobalStore(state => state.setLoading);

  const [data, setData] = useState([]);

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
    const response = await getUsersForCompanyAPI({
      skip,
      limit,
      searchKeyword,
    });
    if (response) {
      setDocumentsCount(response?.documentsCount);
      setData([...response.users]);

      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [skip]);

  useEffect(() => {
    getData(true);
  }, [searchKeyword]);

  return (
    <>
      {data.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable'>
          {data?.map(user => (
            <UserCard user={user} key={user?._id} />
          ))}
          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t('table.User Number')}</th>
                <th>{t(`table.user`)}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {row['userNumber']}</td>
                  <td> {row['name']}</td>
                  <td className='flex gap-2'>
                    <SmButton
                      variant='small'
                      theme='primary'
                      title='View Profile'
                      onClick={() =>
                        navigate(`/company/users/profile/${row._id}`)
                      }
                    />
                    <SmButton
                      variant='small'
                      theme='primary'
                      title='See Plannings'
                      onClick={() =>
                        navigate(`/company/users/user-plans/${row._id}`)
                      }
                    />
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

export default UsersTable;
