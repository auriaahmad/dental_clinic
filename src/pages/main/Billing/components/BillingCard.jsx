import React from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const BillingCard = ({ invoice, downloadInvoice, deleteInvoice }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='planningCard'>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <span>{t('table.user')}</span>
          <span>{invoice['_dentist']?.['name'] || '-'}</span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.date')}</span>
          <span>{moment(invoice['createdAt']).format('MM/DD/YYYY')}</span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.product')}</span>
          <span>{invoice?.['_product']?.['product'] || '-'}</span>
        </div>
      </div>
      <div className='planningCard__col'>
        <div className='planningCard__col__item'>
          <div className='flex gap-1'>
            <SmButton
              variant='small'
              theme='primary'
              title='Download'
              onClick={() => downloadInvoice(invoice)}
            />
            <SmButton variant='small' theme='primary' title='See' />
            <SmButton
              variant='small'
              theme='danger'
              title='Delete'
              onClick={() => deleteInvoice(invoice._id)}
            />
          </div>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.patient')}</span>
          <span className='capitalize '>
            {invoice['_patient']?.['name'] || '-'}
          </span>
        </div>
        <div className='planningCard__col__item'>
          <span>{t('table.invoiceNumber')}</span>
          <span className='capitalize '>{invoice['invoiceNumber']}</span>
        </div>
      </div>
    </div>
  );
};

export default BillingCard;
