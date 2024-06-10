import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/planilink.svg';
import cookie from '../../assets/cookie.svg';
import privacy from '../../assets/privacy.svg';
import notice from '../../assets/notice.svg';
import { navLinks, userNavLinks } from '../../shared/navigation';
import logout from '../../assets/logout.svg';
import { useTranslation } from 'react-i18next';
import useHelpers from '../../hooks/useHelpers';
import { logoutUserAPI } from '../../apis/authAPIs';
import { useGlobalStore } from '../../store/store';

const Sidebar = ({ type, user, setShowSideBar }) => {
  const location = useLocation();
  const { navigateToPage } = useHelpers();
  const updateUser = useGlobalStore(state => state.updateUser);
  const navigate = useNavigate();

  let links = type === 'user' ? userNavLinks : navLinks;
  const { t } = useTranslation();

  const logoutUser = async () => {
    const response = await logoutUserAPI();
    if (response) {
      updateUser();
      window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/auth/signin`;
    }
  };

  return (
    <div className='sidebar' id='sidebar' style={{ zIndex: 50000000000 }}>
      <div className='sidebar__top'>
        <div className='sidebar__top__logo'>
          <img src={logo} alt='' />
        </div>
        <nav className='sidebar__top__nav'>
          <ul>
            {links.map((link, index) => (
              <div
                onClick={() => {
                  setShowSideBar(false);
                  navigate(link.path);
                }}
                key={link.path}
                className='cursor-pointer'
              >
                <li
                  key={link.path}
                  className={location.pathname.includes(link.path) && 'active'}
                  id={`link_${index}`}
                >
                  <b
                    className={`curve ${
                      location.pathname.includes(link.path) &&
                      `active active_${index}`
                    }`}
                  ></b>
                  <b
                    className={`curve ${
                      location.pathname.includes(link.path) &&
                      `active active_${index}`
                    } `}
                  ></b>
                  <div className='link'>
                    <div className='icon'>
                      <img
                        src={
                          location.pathname.includes(link.path)
                            ? link.activeLink
                            : link.defaultIcon
                        }
                        alt=''
                      />
                    </div>
                    <div
                      style={{
                        color: location.pathname.includes(link.path)
                          ? '#12083a'
                          : 'white',
                      }}
                      className='text'
                    >
                      {t(`sideBar.${link.title}`)}
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </nav>
      </div>
      <div className='sidebar__bottom'>
        <div className='sidebar__bottom__top'>
          <button
            onClick={() =>
              navigateToPage(
                `/${user.type === 'dentist' ? 'user' : 'company'}/cookie-policy`
              )
            }
            style={styles.linksStyles}
          >
            <img src={cookie} alt='' />
            <div style={styles.linksStyles}>{t('sideBar.Cookie Policy')}</div>
          </button>
          <button
            style={styles.linksStyles}
            onClick={() =>
              navigateToPage(
                `/${user.type === 'dentist' ? 'user' : 'company'}/privacy`
              )
            }
          >
            <img src={privacy} alt='' />
            <div style={styles.linksStyles}>{t('sideBar.Privacy Policy')}</div>
          </button>
          <button
            onClick={() =>
              navigateToPage(
                `/${user.type === 'dentist' ? 'user' : 'company'}/terms`
              )
            }
          >
            <img src={notice} alt='' />
            <div style={styles.linksStyles}>
              {t('sideBar.Legal Notice and Conditions')}
            </div>
          </button>
        </div>
        <button
          className='logoutbtn bg-[#FFFFFF1A] w-full p-3 rounded-[8px] flex gap-3 items-center'
          onClick={logoutUser}
        >
          <img src={logout} alt='' className='w-6 h-6' />{' '}
          <div style={styles.linksStyles}>{t('sideBar.Sign Out')}</div>
        </button>
      </div>
    </div>
  );
};

const styles = {
  linksStyles: {
    color: 'white',
  },
};

export default Sidebar;
