import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

const LegalMobile = () => {
  const { t } = useTranslation();
  const actionControl = useAnimation();
  const [actionRef, actionInView] = useInView();

  const actionVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    if (actionInView) actionControl.start('visible');
    else actionControl.start('hidden');
  }, [actionControl, actionInView]);
  return (
    <motion.div
      className='legalWritingMob'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='legalWritingMob__heading'>
        {t('termsandcondition.terms and condition')}
      </div>
      <div className='legalWritingMob__textarea'>
        <div>
          <div>
            <div className='primary-generic' style={{ fontSize: '14px' }}>
              {t('termsandcondition.Updated as of 02/08/2024')}
            </div>
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
          </div>
        </div>
        <div>
          <div className='primaryHeading'>
            {t('termsandcondition.Medical Disclaimer')}
          </div>
          <div>{t('termsandcondition.All information contained')}</div>
          <div>{t('termsandcondition.The information obtained')}</div>
          <div>{t('termsandcondition.You should never disregard')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Use of the content of the Website')}
          </div>
          <div>{t('termsandcondition.The intellectual property rights')}</div>
          <div>{t('termsandcondition.You are not permitted to use')}</div>
          <div>{t('termsandcondition.You are also not permitted')}</div>
          <div>{t('termsandcondition.Notwithstanding this, you may')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.User behavior')}
          </div>
          <div>{t('termsandcondition.Please note that you')}</div>
          <div>{t('termsandcondition.or not use or access the')}</div>
          <div>{t('termsandcondition.or not use or access the Website')}</div>
          <div>{t('termsandcondition.or not interfere with')}</div>
          <div>{t('termsandcondition.or not transmit or make')}</div>
          <div>{t('termsandcondition.or not restrict or inhibit')}</div>
          <div>{t('termsandcondition.or not modify, adapt or translate')}</div>
          <div>{t('termsandcondition.or not remove, obscure or alter')}</div>
          <div>{t('termsandcondition.or not use any robot')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Comments')}
          </div>
          <div>{t('termsandcondition.Any comments, information,')}</div>
          <div>{t('termsandcondition.You also grant us the right')}</div>
          <div className='primaryHeading'>
            {t(
              'termsandcondition.Modification, suspension and termination of the Website'
            )}
          </div>
          <div>{t('termsandcondition.It is important to note that')}</div>
          <div>{t('termsandcondition.We may also update and change')}</div>
          <div>{t('termsandcondition.We may also interrupt')}</div>
          <div>{t('termsandcondition.We also do not guarantee')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Other websites and resources')}
          </div>
          <div>{t('termsandcondition.Please note that the Website')}</div>
          <div>{t('termsandcondition.or we are not responsible')}</div>
          <div>{t('termsandcondition.or we have no commitment,')}</div>
          <div>{t('termsandcondition.or if you access such websites,')}</div>
          <div>{t('termsandcondition.You may not create a link')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Privacy and cookies')}
          </div>
          <div>
            {t('termsandcondition.Our policies regarding the collection')}
          </div>
          <div className='primaryHeading'>
            {t('termsandcondition.Legal notice')}
          </div>
          <div>{t('termsandcondition.Although we make every effort')}</div>
          <div>{t('termsandcondition.Taking this into account')}</div>
          <div>{t('termsandcondition.or that access to the Website')}</div>
          <div>
            {t('termsandcondition.or that the Website or the computer')}
          </div>
          <div>{t('termsandcondition.or the accuracy, content')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Limitation of liability')}
          </div>
          <div>{t('termsandcondition.Nothing in these Terms')}</div>
          <div>{t('termsandcondition.We will not be liable to you')}</div>
          <div>{t('termsandcondition.You also acknowledge and agree')}</div>
          <div>{t('termsandcondition.If you are a consumer')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Our rights')}
          </div>
          <div>{t('termsandcondition.We may transfer all of')}</div>
          <div>{t('termsandcondition.If we do not insist that you')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Planning')}
          </div>
          <div>{t('termsandcondition.Planilink reserves')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Payment terms')}
          </div>
          <div>{t('termsandcondition.Buyers pay Planilink')}</div>
          <div>{t('termsandcondition.You cannot pay using')}</div>
          <div>{t('termsandcondition.If you have been asked')}</div>
          <div>{t('termsandcondition.By using the payment')}</div>
          <div>
            {t('termsandcondition.Planilink reserves the right to cancel')}
          </div>
          <div className='whiteHeading'>{t('termsandcondition.Payments')}</div>
          <div>{t('termsandcondition.Planilink accepts')}</div>
          <div>{t('termsandcondition.The buyer will be able')}</div>
          <div>{t('termsandcondition.Payments will be made')}</div>
          <div>{t('termsandcondition.The total amount to pay')}</div>
          <div>{t('termsandcondition.The planning charge will be')}</div>
          <div>{t('termsandcondition.Prices are subject')}</div>
          <div>{t('termsandcondition.Buyers are responsible')}</div>
          <div className='whiteHeading'>{t('termsandcondition.Refunds')}</div>
          <div>{t('termsandcondition.If Planilink decides not to plan')}</div>
          <div>{t('termsandcondition.To request a return,')}</div>
          <div>{t('termsandcondition.Return requests must include')}</div>
          <div>{t('termsandcondition.The period granted to make')}</div>
          <div>{t('termsandcondition.Once case planning has been')}</div>
          <div>{t('termsandcondition.The refund will be made')}</div>
          <div>{t('termsandcondition.The time required for the refund')}</div>
          <div>{t('termsandcondition.By using our online payment')}</div>
          <div className='primaryHeading'>
            {t('termsandcondition.Legal disputes')}
          </div>
          <div>{t('termsandcondition.Any dispute related to these Terms')}</div>
          <div className='primaryHeading'>{t('termsandcondition.Contact')}</div>
          <div>{t('termsandcondition.If you believe that any of your')}</div>
          <div>{t('termsandcondition.If you have any other questions')}</div>
          <div>{t('termsandcondition.Copyright')}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default LegalMobile;
