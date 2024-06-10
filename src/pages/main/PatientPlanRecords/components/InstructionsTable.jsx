import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useRef, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';

import {
  deleteTreatmentPlanForCompanyAPI,
  editTreatmentPlanForCompanyAPI,
  getPlanInstructionsForCompanyAPI,
} from '../../../../apis/plansAPI';
import Pagination from '../../../../components/common/Pagination';

import moment from 'moment';
import { getPreSignedURLAPI, uploadToS3 } from '../../../../apis/uploadAPIs';
import { useGlobalStore } from '../../../../store/store';
import EditCopyLinkModalOpen from './EditCopyLinkModalOpen';
import PlanningCard from './PlanningCard';
import { useNavigate } from 'react-router';
import { planStatus2 } from '../../../../shared/variables';

const InstructionsTable = ({ _plan, data, setData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setLoading, lang } = useGlobalStore(state => state);

  const fileRef = useRef();
  // If company user wants to update a report
  const [file, setFile] = useState();
  const [selectedTreatment, setSelectedTreatment] = useState();

  const [editCopyLinkModalOpen, setEditCopyLinkModalOpen] = useState(false);

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
    const response = await getPlanInstructionsForCompanyAPI({
      skip,
      limit,
      _plan,
    });
    if (response) {
      setDocumentsCount(response.documentsCount);

      const instructions = [];
      const treatments = [];

      response.instructions.forEach(ins => {
        if (ins.instructions) {
          instructions.push({
            ...ins,
            insType: 'instructions',
            index: instructions.length + 1,
          });
        } else {
          treatments.push({
            ...ins,
            insType: 'treatment',
            index: treatments.length + 1,
          });
        }
      });

      let tempData = [...instructions, ...treatments];
      tempData = tempData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setData([...tempData]);
    }
  };

  useEffect(() => {
    getData();
  }, [skip]);

  const downloadFile = files => {
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

  const deleteTreatmentPlan = async _treatment => {
    const confirm = window.confirm(
      lang === 'es' ? 'Estas seguro?' : 'Are you sure?'
    );
    if (!confirm) return;
    const response = await deleteTreatmentPlanForCompanyAPI(_treatment);
    if (response) {
      setData(pS => {
        const index = pS.findIndex(item => item._id === _treatment);
        pS.splice(index, 1);
        return [...pS];
      });
    }
  };

  const handleFileChange = async event => {
    if (!event.target.files?.[0] || !selectedTreatment) return;
    // Upload file

    setLoading(true);
    try {
      let treatmentFile;

      const splittedFileName = event.target.files[0].name.split('/');
      let fileType = splittedFileName[splittedFileName.length - 1];
      let fileName = event.target.files[0].name.replace(`.${fileType}`, '');

      const { url: filePreSignedURL } = await getPreSignedURLAPI({
        type: event.target.files[0].type,
        fileName,
      });
      const s3Response = await uploadToS3(
        filePreSignedURL,
        event.target.files[0]
      );
      if (s3Response) treatmentFile = s3Response?.config?.url?.split('?')[0];

      const response = await editTreatmentPlanForCompanyAPI({
        _instruction: selectedTreatment._id,
        treatmentFile,
      });
      if (response) {
        const treatmentIndex = data.findIndex(
          item => item._id === selectedTreatment._id
        );

        data[treatmentIndex].treatmentFile = response.instruction.treatmentFile;
        setData([...data]);
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setSelectedTreatment();
    }
  };

  const handleCloseEditCopyLinkModal = () => {
    setEditCopyLinkModalOpen(false);
    setSelectedTreatment();
  };

  return (
    <>
      {data?.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable'>
          {data?.map(instruction => (
            <PlanningCard
              instruction={instruction}
              key={instruction?._id}
              downloadFile={downloadFile}
              setSelectedTreatment={setSelectedTreatment}
              fileRef={fileRef}
              setEditCopyLinkModalOpen={setEditCopyLinkModalOpen}
              deleteTreatmentPlan={deleteTreatmentPlan}
            />
          ))}
          <input
            type='file'
            accept='application/pdf'
            ref={fileRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
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
                    {row['insType'] === 'treatment'
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
                        {row['treatmentFile'] && (
                          <SmButton
                            variant='small'
                            theme='primary'
                            title='View Report'
                            onClick={() => downloadFile([row['treatmentFile']])}
                          />
                        )}

                        {row['treatmentFile'] && (
                          <SmButton
                            variant='small'
                            theme='primary'
                            title='Edit Report'
                            onClick={() => {
                              setSelectedTreatment(row);
                              fileRef.current.click();
                            }}
                          />
                        )}

                        {row['copyLink'] && (
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
                        )}

                        {row['copyLink'] && (
                          <SmButton
                            variant='small'
                            theme='primary'
                            title='Edit Simulation'
                            onClick={() => {
                              setSelectedTreatment(row);
                              setEditCopyLinkModalOpen(true);
                            }}
                          />
                        )}

                        <SmButton
                          variant='small'
                          theme='danger'
                          title='Delete'
                          onClick={() => deleteTreatmentPlan(row['_id'])}
                        />
                      </div>
                    ) : (
                      <>
                        <SmButton
                          variant='small'
                          theme='primary'
                          title='See'
                          onClick={() =>
                            navigate(
                              `/company/plannings/instructions/${row._id}`
                            )
                          }
                        />
                      </>
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
          <EditCopyLinkModalOpen
            open={editCopyLinkModalOpen}
            handleClose={handleCloseEditCopyLinkModal}
            treatment={selectedTreatment}
            setData={setData}
          />
        </div>
      )}
    </>
  );
};

export default InstructionsTable;
