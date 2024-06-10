import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { saveAs } from 'file-saver';
import SmButton from '../../../../components/form/SmButton';

import Pagination from '../../../../components/common/Pagination';
import { useGlobalStore } from '../../../../store/store';
import {
  deleteBillingInvoiceForCompanyAPI,
  downloadInvoiceAPI,
  getBillingsForCompanyAPI,
} from '../../../../apis/billing';
import { toast } from 'react-toastify';
import BillingCard from './BillingCard';
import PDFModal from '../../../user/UserBilling/components/PDFModal';
import useScreenSize from '../../../../hooks/useResize';
import Invoice from '../../../../components/common/Invoice';
import { pdf } from '@react-pdf/renderer';

const BillingTable = ({
  data,
  setData,
  userSearchKeyword,
  patientSearchKeyword,
}) => {
  const { width: screenWidth } = useScreenSize();
  const { t } = useTranslation();
  const { setLoading, lang, user } = useGlobalStore(state => state);

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
    const response = await getBillingsForCompanyAPI({
      skip: forcedSkip ? 0 : skip,
      limit,
      userSearchKeyword,
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
  }, [userSearchKeyword, patientSearchKeyword]);

  const downloadInvoice = async billing => {
    const response = await downloadInvoiceAPI(billing._id);
    if (response) {
      if (screenWidth > 600) setInvoice(response.data?.invoice);
      else {
        const file = await pdf(
          <Invoice invoice={response.data?.invoice} user={user} />
        ).toBlob();
        // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(file, 'invoice.pdf');
      }
    }
  };

  const deleteInvoice = async _invoice => {
    const confirm = window.confirm(
      lang === 'en' ? 'Are you sure?' : 'Estas seguro?'
    );
    if (!confirm) return;
    const response = await deleteBillingInvoiceForCompanyAPI(_invoice);
    if (response) {
      toast(t('messages.success'), { toastId: 1 });
      setData(pS => {
        const invoiceIndex = pS.findIndex(item => item._id === _invoice);
        pS.splice(invoiceIndex, 1);
        return [...pS];
      });
    }
  };

  useEffect(() => {
    if (invoice) setPDFModalOpen(true);
  }, [invoice]);

  return (
    <>
      {data.length < 1 ? (
        <div className='w-full min-h-[50vh] flex justify-center items-center'>
          <h1 className='heading-5'>{t('messages.noRecordFound')}</h1>
        </div>
      ) : (
        <div className='cTable'>
          {data?.map(invoice => (
            <BillingCard
              invoice={invoice}
              key={invoice?._id}
              deleteInvoice={deleteInvoice}
              downloadInvoice={downloadInvoice}
            />
          ))}
          <table className='cTable--table'>
            <thead>
              <tr>
                <th>{t(`table.date`)}</th>
                <th>{t(`table.user`)}</th>
                <th>{t(`table.patient`)}</th>
                <th>{t(`table.product`)}</th>
                <th>{t(`table.order`)}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  <td> {moment(row['createdAt']).format('MM/DD/YYYY')}</td>
                  <td> {row['_dentist']?.['name'] || '-'}</td>
                  <td> {row['_patient']?.['name'] || '-'}</td>
                  <td>
                    {' '}
                    {console.log(row, '><')}
                    {row['product']?.['name'] ||
                      row['_product']?.['product'] ||
                      '-'}
                  </td>
                  <td> {row['invoiceNumber']}</td>
                  <td className='flex justify-end'>
                    <div className='flex gap-2'>
                      <SmButton
                        variant='small'
                        theme='primary'
                        title='Download'
                        onClick={() => downloadInvoice(row)}
                      />
                      <SmButton variant='small' theme='primary' title='See' />
                      <SmButton
                        variant='small'
                        theme='danger'
                        title='Delete'
                        onClick={() => deleteInvoice(row._id)}
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
          <PDFModal
            open={pdfModalOpen}
            setOpen={setPDFModalOpen}
            invoice={invoice}
          />
        </div>
      )}
    </>
  );
};

export default BillingTable;
