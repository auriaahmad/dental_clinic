import es from '../../../assets/spanishDL.svg';
import en from '../../../assets/englishDL.svg';
import download from '../../../assets/downloadBtn.svg';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';

const DownloadMobile = ({ downloadFile }) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className='downloadMob'
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='downloadMob__container'>
        <div className='downloadMob__container__heading'>
          {t('download.Here is your guide to make aligners')}
        </div>
        <div className='downloadMob__container__note'>
          {t('download.This guide is a tried')}
        </div>
      </div>

      <div className='downloadMob__container1'>
        <div>
          <img src={es} alt='spanish' />
          <div>
            Descarga ahora la guía en español para fabricar tus propios
            alineadores
          </div>
          <div className='downloadBtn' onClick={() => downloadFile('es')}>
            <img src={download} alt='download' />
            <div>Descargar</div>
          </div>
        </div>
        <div>
          <img src={en} alt='english' />
          <div>Download now the guide in English to make your own aligners</div>
          <div className='downloadBtn' onClick={() => downloadFile('en')}>
            <img src={download} alt='download' />
            <div>Download</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DownloadMobile;
