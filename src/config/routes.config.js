import PrivateRoute from '../components/common/PrivateRoute';
import PrivateRouteDentist from '../components/common/PrivateRouteDentist';
import AuthLayout from '../components/layouts/AuthLayout';
import MainLayout from '../components/layouts/MainLayout';
import RecoverPassword from '../pages/auth/RecoverPassword';
import Signin from '../pages/auth/Signin';
import Billing from '../pages/main/Billing';
import ChangePlan from '../pages/main/ChangePlan';
import Dashboard from '../pages/main/Dashboard';
import PatientPlanRecords from '../pages/main/PatientPlanRecords';
import PatientPlans from '../pages/main/PatientPlans';
import Profile from '../pages/main/Profile';
import Users from '../pages/main/Users';
import Prices from '../pages/main/Prices';
import Queries from '../pages/main/Queries';
import UserPlans from '../pages/main/UserPlans';
import Query from '../pages/main/Query';
import UserDashboard from '../pages/user/UserDashboard';
import NewPlan from '../pages/user/NewPlan';
import UserPatientPlans from '../pages/user/UserPatientPlans';
import PatientPlanTreatments from '../pages/user/PatientPlanTreatments';
import PlanInstructions from '../pages/user/PlanInstructions';
import UserBilling from '../pages/user/UserBilling';
import UserProfile from '../pages/user/UserProfile';
import UserQueries from '../pages/user/UserQueries';
import CookiePolicy from '../pages/user/CookiePolicy';
import PendingPayments from '../pages/user/PendingPayments';
import UserQuery from '../pages/user/UserQuery';
import UserPrices from '../pages/user/UserPrices';
import NewPlanInstructions from '../pages/user/NewPlanInstructions';
import Home from '../pages/home/home';
import HomeLayout from '../components/layouts/HomeLayout';
import Privacy from '../pages/home/privacy';
import LegalWriting from '../pages/home/legalWriting';
import Cookies from '../pages/home/cookies';
import Download from '../pages/download';
import Advantage from '../pages/home/advantage';
import Web from '../pages/home/QAs/web';
import Biomodels from '../pages/home/QAs/biomodels';
import AlignerManufacturing from '../pages/home/QAs/alignerManufactureing';
import AlignerMaterial from '../pages/home/QAs/alignerMaterial';
import Payment from '../pages/home/QAs/payment';
import PlaniLinkSupport from '../pages/home/QAs/planiLinkSupport';
import PlanningHome from '../pages/home/QAs/planningHome';
import Records from '../pages/home/QAs/records';
import QALayout from '../components/layouts/QALayout';
import Signup from '../pages/auth/Signup';
import NewPlanPatient from '../pages/user/NewPlanPatient';
import Plan from '../pages/user/Instruction';
import Instruction from '../pages/user/Instruction';
import PrivacyPolicy from '../pages/user/PrivacyPolicy';
import Terms from '../pages/user/Terms';
import PDFViewerPage from '../components/common/PDFViewer';

export const routesConfig = [
  {
    path: '/company',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/company/plannings',
        element: <Dashboard />,
      },
      {
        path: '/company/plannings/patient-plans/:_patient',
        element: <PatientPlans />,
      },
      {
        path: '/company/plannings/patient-plan-record/:_plan',
        element: <PatientPlanRecords />,
      },
      {
        path: '/company/plannings/change-plan/:_patient',
        element: <ChangePlan />,
      },
      {
        path: '/company/plannings/instructions/:_instruction',
        element: <Instruction />,
      },
      {
        path: '/company/billing',
        element: <Billing />,
      },
      {
        path: '/company/users',
        element: <Users />,
      },
      {
        path: '/company/users/user-plans/:_user',
        element: <UserPlans />,
      },
      {
        path: '/company/users/profile/:_user',
        element: <Profile />,
      },
      {
        path: '/company/pricing',
        element: <Prices />,
      },
      {
        path: '/company/queries',
        element: <Queries />,
      },
      {
        path: '/company/queries/:_query',
        element: <Query />,
      },
      {
        path: '/company/cookie-policy',
        element: <CookiePolicy />,
      },
      {
        path: '/company/privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/company/terms',
        element: <Terms />,
      },
    ],
  },
  {
    path: '/user',
    element: (
      <PrivateRouteDentist>
        <MainLayout type='user' />
      </PrivateRouteDentist>
    ),
    children: [
      {
        path: '/user/plannings',
        element: <UserDashboard />,
      },
      {
        path: '/user/plannings/new-plan',
        element: <NewPlan />,
      },
      {
        path: '/user/plannings/instructions/:_instruction',
        element: <Instruction />,
      },
      {
        path: '/user/plannings/new-plan/:_patient',
        element: <NewPlanPatient />,
      },
      {
        path: '/user/plannings/new-plan-instructions/:_plan',
        element: <NewPlanInstructions />,
      },
      {
        path: '/user/plannings/instructions/:_instruction',
        element: <NewPlanInstructions />,
      },
      {
        path: '/user/plannings/patient-plan-record/:_plan',
        element: <PatientPlanRecords />,
      },
      {
        path: '/user/plannings/patient-plans/:_patient',
        element: <UserPatientPlans />,
      },
      {
        path: '/user/plannings/patient-plan-treatments/:_plan',
        element: <PatientPlanTreatments />,
      },
      {
        path: '/user/plannings/plan-instructions/:_plan',
        element: <PlanInstructions />,
      },
      {
        path: '/user/plannings/pending-payments',
        element: <PendingPayments />,
      },
      {
        path: '/user/billing',
        element: <UserBilling />,
      },
      {
        path: '/user/users',
        element: <Users />,
      },
      {
        path: '/user/profile',
        element: <UserProfile />,
      },
      {
        path: '/user/pricing',
        element: <UserPrices />,
      },
      {
        path: '/user/queries',
        element: <UserQueries />,
      },
      {
        path: '/user/queries/:query',
        element: <UserQuery />,
      },
      {
        path: '/user/cookie-policy',
        element: <CookiePolicy />,
      },
      {
        path: '/user/privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/user/terms',
        element: <Terms />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/signin',
        element: <Signin />,
      },
      {
        path: '/auth/signup',
        element: <Signup />,
      },
      {
        path: '/auth/password-recovery',
        element: <RecoverPassword />,
      },
    ],
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/legal',
        element: <LegalWriting />,
      },
      {
        path: '/cookies',
        element: <Cookies />,
      },
      {
        path: '/aligners',
        element: <Download />,
      },
      {
        path: '/advantage',
        element: <Advantage />,
      },
      {
        path: '/faq',
        element: <QALayout />,
        children: [
          {
            path: '/faq/web',
            element: <Web />,
          },
          {
            path: '/faq/biomodels',
            element: <Biomodels />,
          },
          {
            path: '/faq/planning',
            element: <PlanningHome />,
          },
          {
            path: '/faq/records',
            element: <Records />,
          },
          {
            path: '/faq/alignerManufacturing',
            element: <AlignerManufacturing />,
          },
          {
            path: '/faq/alignerMaterial',
            element: <AlignerMaterial />,
          },
          {
            path: '/faq/payment',
            element: <Payment />,
          },
          {
            path: '/faq/planiLinkSupport',
            element: <PlaniLinkSupport />,
          },
        ],
      },
    ],
  },
];
