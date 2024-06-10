import CookiesSettingModal from './components/CookiesSettingModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();
  const [cookiesSettingModal, setCookiesSettingModal] = useState(true);
  const closeCookiesSettingModal = () => setCookiesSettingModal(false);
  return (
    <div className='flex flex-col'>
      <h1 className='heading-1'>
        {' '}
        {t('termsandcondition.terms and condition')}
      </h1>
      <div className='w-full mt-[24px] pt-[38px]'>
        <h3 className='heading-5 mb-[8px]'>
          {t('termsandcondition.Updated as of 02/08/2024')}
        </h3>

        <div className='text-serif'>
          {t('termsandcondition.We welcome you to the')}
        </div>
        <div className='text-serif'>
          {t('termsandcondition.Please review the following')}
        </div>
        <div className='text-serif'>
          {t('termsandcondition.It is important for you')}
        </div>
        <div className='text-serif'>
          {t('termsandcondition.Please note that we may')}
        </div>

        <h3 className='heading-5 mb-[8px] mt-8'>
          {t('termsandcondition.Medical Disclaimer')}
        </h3>
        <div className='primaryHeading'>
          {t('termsandcondition.Medical Disclaimer')}
        </div>
        <div>{t('termsandcondition.All information contained')}</div>
        <div>{t('termsandcondition.The information obtained')}</div>
        <div>{t('termsandcondition.You should never disregard')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Use of the content of the Website')}
        </h3>
        <div>{t('termsandcondition.The intellectual property rights')}</div>
        <div>{t('termsandcondition.You are not permitted to use')}</div>
        <div>{t('termsandcondition.You are also not permitted')}</div>
        <div>{t('termsandcondition.Notwithstanding this, you may')}</div>
        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.User behavior')}
        </h3>
        <div>{t('termsandcondition.Please note that you')}</div>
        <div>{t('termsandcondition.or not use or access the')}</div>
        <div>{t('termsandcondition.or not use or access the Website')}</div>
        <div>{t('termsandcondition.or not interfere with')}</div>
        <div>{t('termsandcondition.or not transmit or make')}</div>
        <div>{t('termsandcondition.or not restrict or inhibit')}</div>
        <div>{t('termsandcondition.or not modify, adapt or translate')}</div>
        <div>{t('termsandcondition.or not remove, obscure or alter')}</div>
        <div>{t('termsandcondition.or not use any robot')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Comments')}
        </h3>
        <div>{t('termsandcondition.Any comments, information,')}</div>
        <div>{t('termsandcondition.You also grant us the right')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t(
            'termsandcondition.Modification, suspension and termination of the Website'
          )}
        </h3>

        <div>{t('termsandcondition.It is important to note that')}</div>
        <div>{t('termsandcondition.We may also update and change')}</div>
        <div>{t('termsandcondition.We may also interrupt')}</div>
        <div>{t('termsandcondition.We also do not guarantee')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Privacy and cookies')}
        </h3>
        <div>
          {t('termsandcondition.Our policies regarding the collection')}
        </div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Legal notice')}
        </h3>
        <div>{t('termsandcondition.Although we make every effort')}</div>
        <div>{t('termsandcondition.Taking this into account')}</div>
        <div>{t('termsandcondition.or that access to the Website')}</div>
        <div>{t('termsandcondition.or that the Website or the computer')}</div>
        <div>{t('termsandcondition.or the accuracy, content')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Limitation of liability')}
        </h3>

        <div>{t('termsandcondition.Nothing in these Terms')}</div>
        <div>{t('termsandcondition.We will not be liable to you')}</div>
        <div>{t('termsandcondition.You also acknowledge and agree')}</div>
        <div>{t('termsandcondition.If you are a consumer')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Our rights')}
        </h3>

        <div>{t('termsandcondition.We may transfer all of')}</div>
        <div>{t('termsandcondition.If we do not insist that you')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Planning')}
        </h3>
        <div>{t('termsandcondition.Planilink reserves')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Payment terms')}
        </h3>

        <div>{t('termsandcondition.Buyers pay Planilink')}</div>
        <div>{t('termsandcondition.You cannot pay using')}</div>
        <div>{t('termsandcondition.If you have been asked')}</div>
        <div>{t('termsandcondition.By using the payment')}</div>
        <div>
          {t('termsandcondition.Planilink reserves the right to cancel')}
        </div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Payments')}
        </h3>
        <div>{t('termsandcondition.Planilink accepts')}</div>
        <div>{t('termsandcondition.The buyer will be able')}</div>
        <div>{t('termsandcondition.Payments will be made')}</div>
        <div>{t('termsandcondition.The total amount to pay')}</div>
        <div>{t('termsandcondition.The planning charge will be')}</div>
        <div>{t('termsandcondition.Prices are subject')}</div>
        <div>{t('termsandcondition.Buyers are responsible')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Refunds')}
        </h3>
        <div>{t('termsandcondition.If Planilink decides not to plan')}</div>
        <div>{t('termsandcondition.To request a return,')}</div>
        <div>{t('termsandcondition.Return requests must include')}</div>
        <div>{t('termsandcondition.The period granted to make')}</div>
        <div>{t('termsandcondition.Once case planning has been')}</div>
        <div>{t('termsandcondition.The refund will be made')}</div>
        <div>{t('termsandcondition.The time required for the refund')}</div>
        <div>{t('termsandcondition.By using our online payment')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Legal disputes')}
        </h3>
        <div>{t('termsandcondition.Any dispute related to these Terms')}</div>

        <h3 className='heading-5 mt-[32px]'>
          {t('termsandcondition.Contact')}
        </h3>
        <div>{t('termsandcondition.If you believe that any of your')}</div>
        <div>{t('termsandcondition.If you have any other questions')}</div>
        <div>{t('termsandcondition.Copyright')}</div>
      </div>
    </div>
  );
};

export default Terms;
