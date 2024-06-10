import FWButton from '../form/FWButton';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function HomeCard() {
  const navigate = useNavigate();
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
      className='homeCard mobhomeCard'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='homeCard__contentSpace mobhomeCard__contentSpace'>
        <div className='homeCard__contentSpace__content mobhomeCard__contentSpace__content'>
          <div className='homeCard__contentSpace__content__text1 mobhomeCard__contentSpace__content__text1'>
            {t('homeCard.A quality planning')}
          </div>
          <div>
            <span className='homeCard__contentSpace__content__text2 mobhomeCard__contentSpace__content__text2 text-white'>
              Plani
            </span>
            <span className='homeCard__contentSpace__content__text2 mobhomeCard__contentSpace__content__text2  text-[#F00]'>
              Link
            </span>
          </div>
          <div>
            <FWButton
              title={t('homeCard.Planning Area')}
              variant='transparentMob'
              style={{ background: 'transparent' }}
              onClick={() => navigate('/user/plannings')}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HomeCard;
