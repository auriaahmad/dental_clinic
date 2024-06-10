import billingWhite from '../assets/billingWhite.svg';
import billingBlue from '../assets/billingBlue.svg';
import planningTheme from '../assets/planningTheme.svg';
import planningWhite from '../assets/planningWhite.svg';
import userWhite from '../assets/userWhite.svg';
import userTheme from '../assets/userTheme.svg';
import queriesTheme from '../assets/queriesTheme.svg';
import queriesWhite from '../assets/queriesWhite.svg';
import priceTheme from '../assets/priceTheme.svg';
import priceWhite from '../assets/priceWhite.svg';

export const navLinks = [
  {
    title: 'Planning',
    defaultIcon: planningWhite,
    activeLink: planningTheme,
    path: '/company/plannings',
  },
  {
    title: 'Billing',
    defaultIcon: billingWhite,
    activeLink: billingBlue,
    path: '/company/billing',
  },
  {
    title: 'Users',
    defaultIcon: userWhite,
    activeLink: userTheme,
    path: '/company/users',
  },
  {
    title: 'Queries',
    defaultIcon: queriesWhite,
    activeLink: queriesTheme,
    path: '/company/queries',
  },
  {
    title: 'Pricing',
    defaultIcon: priceWhite,
    activeLink: priceTheme,
    path: '/company/pricing',
  },
];

export const userNavLinks = [
  {
    title: 'Planning',
    defaultIcon: planningWhite,
    activeLink: planningTheme,
    path: '/user/plannings',
  },
  {
    title: 'Billing',
    defaultIcon: billingWhite,
    activeLink: billingBlue,
    path: '/user/billing',
  },
  {
    title: 'My Profile',
    defaultIcon: userWhite,
    activeLink: userTheme,
    path: '/user/profile',
  },
  {
    title: 'Queries',
    defaultIcon: queriesWhite,
    activeLink: queriesTheme,
    path: '/user/queries',
  },
  {
    title: 'Pricing',
    defaultIcon: priceWhite,
    activeLink: priceTheme,
    path: '/user/pricing',
  },
];
