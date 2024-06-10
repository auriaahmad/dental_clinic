import es from '../../assets/spanishDL.svg';
import en from '../../assets/englishDL.svg';
import download from '../../assets/downloadBtn.svg';
import esFile from '../../assets/Guia_alineadores_ES.pdf';
import enFile from '../../assets/Guide_aligners_EN.pdf';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import DownloadMobile from './components/DownloadMobile';
import { Helmet } from 'react-helmet-async';

function Download() {
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

  const downloadFile = lang => {
    const link = document.createElement('a');
    link.href = lang === 'es' ? esFile : enFile;
    link.download =
      lang === 'es' ? 'Guia_alineadores_ES.pdf' : 'Guide_aligners_EN.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>Guide to make aligners</title>
        <meta
          name='description'
          content='planilink guide is a tried and tested process. Results guaranteed. Once you receive the biomodels in your email, follow the steps to have your own aligners'
        />
        <link rel='canonical' href='https://planilink.com/aligners' />

        <meta name='robots' content='index, follow' />

        {/* <!-- For Social Media --> */}
        <meta name='og:card' content='Guide to make aligners' />
        <meta name='og:title' content='planilink' />
        <meta
          name='og:description'
          content='planilink guide is a tried and tested process. Results guaranteed. Once you receive the biomodels in your email, follow the steps to have your own aligners'
        />
        <meta
          name='og:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://planilink.com/aligners' />
        {/* <!-- For Social Media --> */}

        {/* <!-- Tags for twitter --> */}

        <meta name='twitter:card' content='Guide to make aligners' />
        <meta name='twitter:title' content='planilink' />
        <meta
          name='twitter:description'
          content='planilink guide is a tried and tested process. Results guaranteed. Once you receive the biomodels in your email, follow the steps to have your own aligners'
        />
        <meta
          name='twitter:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        {/* <!-- Tags for twitter --> */}
      </Helmet>
      <div>
        <motion.div
          className='download relative'
          ref={actionRef}
          variants={actionVariants}
          initial='hidden'
          animate={actionControl}
        >
          <div className='circlesGrad absolute top-[15%]  left-[-4rem]' />
          <div className='download__container z-20'>
            <h1 className='download__container__heading'>
              {t('download.Here is your guide to make aligners')}
            </h1>
            <div className='download__container__note'>
              {t('download.This guide is a tried')}
            </div>
          </div>

          <div className='download__container1 z-20'>
            <div>
              <img className='w-[284px] h-[294px]' src={es} alt='spanish' />
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
              <img className='w-[284px] h-[294px]' src={en} alt='english' />
              <div>
                Download now the guide in English to make your own aligners
              </div>
              <div className='downloadBtn' onClick={() => downloadFile('en')}>
                <img src={download} alt='download' />
                <div>Download</div>
              </div>
            </div>
          </div>
        </motion.div>

        <DownloadMobile downloadFile={downloadFile} />
      </div>
    </>
  );
}

export default Download;
