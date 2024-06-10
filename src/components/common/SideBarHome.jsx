import logo from '../../assets/sideBarLogo.svg';
import arrowRight from '../../assets/arrowRight.svg';
import useHelpers from '../../hooks/useHelpers';
import { useTranslation } from 'react-i18next';
function SideBarHome({ toggleSidebar }) {
  const { t } = useTranslation();
  const { navigateToPage } = useHelpers();

  const navigateAndClose = path => {
    navigateToPage(path);
    toggleSidebar();
  };

  return (
    <div className='fixed  z-30 flex left-0 top-0 p-0 w-full h-screen bg-[rgba(0,0,0,0.5)]'>
      <div className={`sideBarHome`}>
        <div className='sideBarHome__leftContainer'>
          <div className='sideBarHome__leftContainer__tabs'>
            <div className='sideBarHome__leftContainer__tabs__logo'>
              <img
                src={logo}
                alt='logo'
                onClick={() => navigateAndClose('/')}
              />
            </div>
            <div className='sideBarHome__leftContainer__tabs__links'>
              <div
                className='sideBarHome__leftContainer__tabs__links__button'
                onClick={() => navigateAndClose('/')}
              >
                <div>{t('buttons.Main')}</div>
                <img src={arrowRight} alt='arrow' />
              </div>
              <div
                className='sideBarHome__leftContainer__tabs__links__button'
                onClick={() => navigateAndClose('/advantage')}
              >
                <div>{t('buttons.New horizons on the invisible level')}</div>
                <img src={arrowRight} alt='arrow' />
              </div>
              <div
                className='sideBarHome__leftContainer__tabs__links__button'
                onClick={() => navigateAndClose('/faq/web')}
              >
                <div>{t('buttons.FAQ')}</div>
                <img src={arrowRight} alt='arrow' />
              </div>
              <div
                className='sideBarHome__leftContainer__tabs__links__button'
                onClick={() => navigateAndClose('/aligners')}
              >
                <div>{t('buttons.Do we fabricate aligners?')}</div>
                <img src={arrowRight} alt='arrow' />
              </div>
            </div>
          </div>
        </div>
        <div className='sideBarHome__buttons'>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className='grow' onClick={toggleSidebar} />
    </div>
  );
}

export default SideBarHome;
