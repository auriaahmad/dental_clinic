import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';

import {
  getDentistPatientsAPI,
  getPlanInstructionsAPI,
} from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';
import { useNavigate } from 'react-router';
import moment from 'moment';
import PlanningCard from './PlanningCard';
import { useGlobalStore } from '../../../../store/store';
import { planStatus2 } from '../../../../shared/variables';

const InstructionsTable = ({ _plan }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLoading, lang } = useGlobalStore(state => state);

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
    setLoading(true);
    const response = await getPlanInstructionsAPI({
      skip,
      limit,
      _plan,
    });

    console.log(response.instructions, ',,,');

    setDocumentsCount(response.documentsCount);
    const treatments = [];
    const instructions = [];
    response.instructions.forEach(ins => {
      if (ins.instructions) {
        instructions.push({
          ...ins,
          index: instructions.length + 1,
          type: 'instructions',
        });
      } else {
        treatments.push({
          ...ins,
          index: `${treatments.length + 1}`,
          type: 'treatment',
        });
      }
    });

    let tempData = [...instructions, ...treatments];
    tempData = tempData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setData([...tempData]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [skip]);

  const downloadFile = files => {
    if (files.length < 1) return;
    files.forEach(url => {
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = new Date();
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  };

  return (
    <>
      {data?.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable mt-5'>
          {data?.map(instruction => (
            <PlanningCard
              instruction={instruction}
              key={instruction?._id}
              downloadFile={downloadFile}
            />
          ))}
          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t(`table.date`)}</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>
                  <td>
                    {' '}
                    {row['type'] === 'treatment'
                      ? planStatus2.some(
                          status => status.title === row['changeStatus2']
                        )
                        ? t(`status2Option.${row['changeStatus2']}`)
                        : row['changeStatus2'] || `-`
                      : // `${t('instructions.Treatment Plan')} ${row['index']}`
                        `${t(
                          'instructions.Records and written instructions'
                        )} ${row['index']}`}
                  </td>
                  <td className='flex justify-end'>
                    {row['type'] === 'company' ? (
                      <div className='flex gap-2'>
                        <SmButton
                          variant='small'
                          theme='primary'
                          title='View Report'
                          onClick={() => downloadFile([row['treatmentFile']])}
                        />
                        <SmButton
                          variant='small'
                          theme='primary'
                          title='See Simulation'
                          onClick={() =>
                            window.open(
                              `${
                                row['copyLink'].includes('http')
                                  ? row['copyLink']
                                  : `http://${row['copyLink']}`
                              }`,
                              '_blank'
                            )
                          }
                        />
                      </div>
                    ) : row['type'] === 'treatment' ? (
                      <div className='flex gap-2'>
                        {row['treatmentFile'] && (
                          <SmButton
                            variant='small'
                            theme='primary'
                            title='Report'
                            onClick={() => downloadFile([row['treatmentFile']])}
                          />
                        )}

                        {row['copyLink'] && (
                          <SmButton
                            variant='small'
                            theme='primary'
                            title='Simulation'
                            onClick={() =>
                              window.open(
                                `${
                                  row['copyLink'].includes('http')
                                    ? row['copyLink']
                                    : `http://${row['copyLink']}`
                                }`,
                                '_blank'
                              )
                            }
                            // onClick={() => downloadFile(row['files'])}
                          />
                        )}
                      </div>
                    ) : (
                      <SmButton
                        variant='small'
                        theme='primary'
                        title='See'
                        onClick={() =>
                          navigate(`/user/plannings/instructions/${row._id}`)
                        }
                        // onClick={() => downloadFile(row['files'])}
                      />
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

export default InstructionsTable;
