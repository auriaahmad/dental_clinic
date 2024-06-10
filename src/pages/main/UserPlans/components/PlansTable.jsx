import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';

import {
  deletePlanForCompanyAPI,
  getPatientPlansForCompanyAPI,
  getUserPlansForCompanyAPI,
} from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';
import { toast } from 'react-toastify';
import PlanningCard from './PlanningCard';
import { useGlobalStore } from '../../../../store/store';

const UserPlansTable = ({ data, setData, _user, setUser }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setLoading = useGlobalStore(state => state.setLoading);

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
    const response = await getUserPlansForCompanyAPI({
      skip,
      limit,
      _user,
    });
    if (response) {
      setDocumentsCount(response?.documentsCount);
      setData([...response.plans]);
      setUser(response.user);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [skip]);

  return (
    <div className='cTable'>
      {data?.map(planning => (
        <PlanningCard planning={planning} key={planning?._id} />
      ))}
      <table className='cTable--table'>
        <thead>
          <tr>
            <th>{t(`table.date`)}</th>
            <th>{t(`table.patient`)}</th>
            <th>{t(`table.planningStatus`)}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>
              <td> {row['_patient']?.['name'] || '-'}</td>

              <td className='color-sky' style={{ textTransform: 'capitalize' }}>
                {row['status']}
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
  );
};

export default UserPlansTable;
