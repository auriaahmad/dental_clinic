import { useNavigate } from 'react-router';
import backArrowCircle from '../../../assets/backArrowCircle.svg';
import QueryChat from './components/QueryChat';
import { useTranslation } from 'react-i18next';

const Query = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className='query'>
      <div className='query__header'>
        <img
          src={backArrowCircle}
          alt=''
          onClick={() => navigate('/company/queries')}
        />
      </div>
      <h2 className='heading-2'>{t('queries.Query')}</h2>

      <QueryChat />
    </div>
  );
};

export default Query;
