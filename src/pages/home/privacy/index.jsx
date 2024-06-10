import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
function Privacy() {
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
    <>
      <Helmet>
        <title>Privacy</title>
        <meta name='description' content='Planilink Cookies' />
        <link rel='canonical' href='https://planilink.com/privacy' />

        <meta name='robots' content='index, follow' />

        {/* <!-- For Social Media --> */}
        <meta name='og:card' content='Planilink privacy' />
        <meta name='og:title' content='privacy' />
        <meta name='og:description' content='Planilink privacy' />
        <meta
          name='og:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://planilink.com/privacy' />
        {/* <!-- For Social Media --> */}

        {/* <!-- Tags for twitter --> */}

        <meta name='twitter:card' content='Planilink privacy' />
        <meta name='twitter:title' content='privacy' />
        <meta name='twitter:description' content='Planilink privacy' />
        <meta
          name='twitter:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        {/* <!-- Tags for twitter --> */}
      </Helmet>

      <motion.div
        ref={actionRef}
        variants={actionVariants}
        initial='hidden'
        animate={actionControl}
      >
        <div className='privacy relative'>
          <div className='circlesGrad absolute top-[15%]  left-[-4rem]' />
          <div className='circlesGrad absolute top-[45%]  right-[-4rem]' />
          <div className='circlesGrad absolute top-[75%]  left-[-4rem]' />
          <h1 className='privacy__heading z-20'>{t('privacy.Privacy')}</h1>
          <div className='w-full'>
            <div>
              <div className='primary-generic'>
                {t('privacy.Updated as of')}
              </div>
              <div className='primary-generic'>{t('privacy.Intro')}</div>
              <div className='primary-generic-text'>
                {t('privacy.Your privacy is very important')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.By using our Sites')}
              </div>
              <div className='primary-generic'>
                {t('privacy.Information we collect from you')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.We collect Personal Information')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.When collecting health data')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.We will also collect')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Sometimes you may choose')}
              </div>
              <div className='primary-generic'>
                {t('privacy.What do we do with the information we collect?')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.We use your Personal Information')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Set up and manage your')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Provide you with information')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Provide you with details of doctors')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Invite you to participate')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Collect demographic information')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Extra line1 in spanish')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Analyze the use of our services')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Use content uploaded to the')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Extra line2 in spanish')}
              </div>
              <div className='primary-generic'>
                {t('privacy.Who do we share your Personal Information with?')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.We partner with other companies')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Additionally, all information')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.We may also disclose Personal')}
              </div>
              <div className='primary-generic'>
                {t('privacy.Cookies y anuncios')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Al igual que muchos sitios web')}
              </div>

              <div className='primary-generic'>
                {t('privacy.Online tracking')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Do Not Track (DNT) is a privacy')}
              </div>

              <div className='primary-generic'>
                {t('privacy.Links to other sites')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Our Sites may contain link')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Additionally, you have the opportunity')}
              </div>

              <div className='primary-generic'>
                {t('privacy.Marketing and do not contact')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Where you have given us')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Nebula Nexus LLC offers')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.You should note that such')}
              </div>

              <div className='primary-generic'>
                {t('privacy.International data transfers')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Nebula Nexus LLC operates')}
              </div>

              <div className='primary-generic'>{t('privacy.Security')}</div>
              <div className='primary-generic-text'>
                {t('privacy.The security of all')}
              </div>

              <div className='primary-generic'>{t('privacy.Updates')}</div>
              <div className='primary-generic-text'>
                {t('privacy.This statement may be updated')}
              </div>

              <div className='primary-generic'>{t('privacy.CONTACT')}</div>
              <div className='primary-generic-text'>
                {t('privacy.If you have any questions')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Extra line3 in spanish')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Nebula Nexus LLC')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.Attention: Privacy Office')}
              </div>
              <div className='primary-generic-text'>
                {t('privacy.8206 Louisiana Blvd')}
              </div>
              <div className='primary-generic-text'>{t('privacy.USA')}</div>
              <div className='primary-generic-text'>
                {t('privacy.privacy@planilink.com')}
              </div>

              {/* <div className='primaryHeading'>{t('privacy.Intro')}</div> */}
            </div>
          </div>
        </div>
        <div className='privacyMob'>
          <div className='privacyMob__heading'>{t('privacy.Privacy')}</div>
          <div className='privacyMob__textarea'>
            <div className='HeadText'>{t('privacy.Intro')}</div>
            <div className=''>
              {t('privacy.Your privacy is very important')}
            </div>
            <div className=''>{t('privacy.By using our Sites')}</div>
            <div className='HeadText'>
              {t('privacy.Information we collect from you')}
            </div>
            <div className=''>
              {t('privacy.We collect Personal Information')}
            </div>
            <div className=''>{t('privacy.When collecting health data')}</div>
            <div className=''>{t('privacy.We will also collect')}</div>
            <div className=''>{t('privacy.Sometimes you may choose')}</div>
            <div className='HeadText'>
              {t('privacy.What do we do with the information we collect?')}
            </div>
            <div className=''>
              {t('privacy.We use your Personal Information')}
            </div>
            <div className=''>{t('privacy.Set up and manage your')}</div>
            <div className=''>{t('privacy.Provide you with information')}</div>
            <div className=''>
              {t('privacy.Provide you with details of doctors')}
            </div>
            <div className=''>{t('privacy.Invite you to participate')}</div>
            <div className=''>
              {t('privacy.Collect demographic information')}
            </div>
            <div className=''>{t('privacy.Extra line1 in spanish')}</div>
            <div className=''>
              {t('privacy.Analyze the use of our services')}
            </div>
            <div className=''>{t('privacy.Use content uploaded to the')}</div>
            <div className=''>{t('privacy.Extra line2 in spanish')}</div>
            <div className='HeadText'>
              {t('privacy.Who do we share your Personal Information with?')}
            </div>
            <div className=''>
              {t('privacy.We partner with other companies')}
            </div>
            <div className=''>{t('privacy.Additionally, all information')}</div>
            <div className=''>{t('privacy.We may also disclose Personal')}</div>
            <div className='HeadText'>{t('privacy.Cookies y anuncios')}</div>
            <div className=''>
              {t('privacy.Al igual que muchos sitios web')}
            </div>

            <div className='HeadText'>{t('privacy.Online tracking')}</div>
            <div className=''>
              {t('privacy.Do Not Track (DNT) is a privacy')}
            </div>

            <div className='HeadText'>{t('privacy.Links to other sites')}</div>
            <div className=''>{t('privacy.Our Sites may contain link')}</div>
            <div className=''>
              {t('privacy.Additionally, you have the opportunity')}
            </div>

            <div className='HeadText'>
              {t('privacy.Marketing and do not contact')}
            </div>
            <div className=''>{t('privacy.Where you have given us')}</div>
            <div className=''>{t('privacy.Nebula Nexus LLC offers')}</div>
            <div className=''>{t('privacy.You should note that such')}</div>

            <div className='HeadText'>
              {t('privacy.International data transfers')}
            </div>
            <div className=''>{t('privacy.Nebula Nexus LLC operates')}</div>

            <div className='HeadText'>{t('privacy.Security')}</div>
            <div className=''>{t('privacy.The security of all')}</div>

            <div className='HeadText'>{t('privacy.Updates')}</div>
            <div className=''>{t('privacy.This statement may be updated')}</div>

            <div className='HeadText'>{t('privacy.CONTACT')}</div>
            <div className=''>{t('privacy.If you have any questions')}</div>
            <div className=''>{t('privacy.Extra line3 in spanish')}</div>
            <div className=''>{t('privacy.Nebula Nexus LLC')}</div>
            <div className=''>{t('privacy.Attention: Privacy Office')}</div>
            <div className=''>{t('privacy.8206 Louisiana Blvd')}</div>
            <div className=''>{t('privacy.USA')}</div>
            <div className=''>{t('privacy.privacy@planilink.com')}</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Privacy;
