import heroGif from '../../assets/heroGif.gif';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function Banner() {
  const { t } = useTranslation();
  const actionHeadingControl = useAnimation();
  const [actionHeadingRef, actionHeadingInView] = useInView();

  const actionImageControl = useAnimation();
  const [actionImageRef, actionImageInView] = useInView();

  const actionHeadingVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, x: -20 },
  };

  const actionImageVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    if (actionHeadingInView) actionHeadingControl.start('visible');
    else actionHeadingControl.start('hidden');
  }, [actionHeadingControl, actionHeadingInView]);

  useEffect(() => {
    if (actionImageInView) actionImageControl.start('visible');
    else actionImageControl.start('hidden');
  }, [actionImageControl, actionImageInView]);

  return (
    <div className='banner bannerMob relative w-full'>
      <div className='circlesGrad absolute top-[-2rem] left-0 sm:top-[-2rem] sm:left-[-4rem]' />

      <div className='banner__heading bannerMob__heading z-20'>
        <motion.h1
          className='home-banner-heading bannerMob__heading__content'
          ref={actionHeadingRef}
          variants={actionHeadingVariants}
          initial='hidden'
          animate={actionHeadingControl}
          exit='exit'
        >
          {t('banner.Plastic Orthodontic Plannings')}
        </motion.h1>
        <div className='home-primary bannerMob__heading__note'>
          {t('banner.Independent brand')}
        </div>
      </div>
      <motion.div
        className='banner__hero bannerMob__hero z-20'
        ref={actionImageRef}
        variants={actionImageVariants}
        initial='hidden'
        animate={actionImageControl}
      >
        <LazyLoadImage src={heroGif} alt='hero' />
      </motion.div>
      <div className='circlesGrad absolute bottom-[2rem] right-[-4rem]' />
    </div>
  );
}
export default Banner;
