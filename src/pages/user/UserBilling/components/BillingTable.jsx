import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';
import Pagination from '../../../../components/common/Pagination';
import { useGlobalStore } from '../../../../store/store';
import {
  downloadInvoiceAPI,
  getBillingsForDentistAPI,
} from '../../../../apis/billing';
import BillingCard from './BillingCard';
import { useNavigate } from 'react-router';
import PDFModal from './PDFModal';
import useScreenSize from '../../../../hooks/useResize';
import Invoice from '../../../../components/common/Invoice';
import { pdf } from '@react-pdf/renderer';

const BillingTable = ({ data, setData, patientSearchKeyword }) => {
  const { width: screenSize } = useScreenSize();
  const { t } = useTranslation();
  const { setLoading, user } = useGlobalStore(state => state);
  const [invoice, setInvoice] = useState();
  const [pdfModalOpen, setPDFModalOpen] = useState(false);

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

  const getData = async forcedSkip => {
    const response = await getBillingsForDentistAPI({
      skip: forcedSkip ? 0 : skip,
      limit,
      patientSearchKeyword,
    });
    if (response) {
      setDocumentsCount(response.documentsCount);
      setData([...response.invoices]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [skip]);

  useEffect(() => {
    setSkip(0);
    getData(true);
  }, [patientSearchKeyword]);

  const downloadInvoice = async billing => {
    const response = await downloadInvoiceAPI(billing._id);

    if (response) {
      console.log(response.data.invoice);
      if (screenSize > 600) setInvoice(response.data?.invoice);
      else {
        const file = await pdf(
          <Invoice invoice={response.data?.invoice} user={user} />
        ).toBlob();
        // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(file, 'invoice.pdf');
      }
    }

    return;
    console.log(response.data);
    // Create a blob from the response data
    const blob = new Blob([response.data], {
      type: 'application/pdf',
    });

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.pdf';

    // Simulate a click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    // console.log(response.data.pdfFile, '<---');
    // const byteCharacters = atob(response.data.pdfFile);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // const blob = new Blob([byteArray], { type: 'application/pdf' });

    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blob);
    // link.download = 'invoice.pdf';
    // link.click();
  };

  useEffect(() => {
    if (invoice) {
      setPDFModalOpen(true);
    }
  }, [invoice]);

  return (
    <>
      {data?.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable'>
          {data?.map(invoice => (
            <BillingCard
              invoice={invoice}
              key={invoice?._id}
              downloadInvoice={downloadInvoice}
            />
          ))}
          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t(`table.date`)}</th>
                <th>{t(`table.patient`)}</th>
                <th>{t(`table.product`)}</th>
                <th>{t(`table.invoiceNumber`)}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>

                  <td> {row['_patient']?.['name'] || '-'}</td>
                  <td> {row['_product']?.['product'] || '-'}</td>
                  <td> {row['invoiceNumber'] || '-'}</td>
                  <td className='flex justify-end'>
                    <div className='flex gap-2'>
                      <SmButton
                        variant='small'
                        theme='primary'
                        title='Download'
                        onClick={() => downloadInvoice(row)}
                      />
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
      <PDFModal
        open={pdfModalOpen}
        setOpen={setPDFModalOpen}
        invoice={invoice}
      />
    </>
  );
};

export default BillingTable;
