import Banner from '../../../components/common/Banner';
import MakeItPossible from './components/MakeItPossible';
import BoostHorizon from './components/BoostHorizon';
import PlanningToChoose from './components/PlanningToChoose';
import Sleeves from './components/Sleeves';
import RegainControl from './components/RegainControl';
import RegainMobile from './components/RegainMobile';
import MakeItPossibleMobile from './components/MakeItPossibleMobile';
import BoostHorizonMobile from './components/BoostHorizonMobile';
import PlanningToChooseMobile from './components/PlanningToChooseMobile';
import SleevesMobile from './components/SleevesMobile';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <>
      <Helmet>
        <title>Planilink</title>
        <meta
          name='description'
          content='planilink plans your plastic orthodontic cases and sends you the sequence of biomodels so that you can make your own aligners on your own.'
          data-r='true'
        />
        <link rel='canonical' href='https://planilink.com/' />

        <meta name='robots' content='index, follow' />

        {/* <!-- For Social Media --> */}
        <meta name='og:card' content='Plastic Orthodontic Plannings' />
        <meta name='og:title' content='planilink' />
        <meta
          name='og:description'
          content='planilink plans your plastic orthodontic cases and sends you the sequence of biomodels so that you can make your own aligners on your own.'
        />
        <meta
          name='og:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://planilink.com/' />
        {/* <!-- For Social Media --> */}

        {/* <!-- Tags for twitter --> */}

        <meta name='twitter:card' content='Plastic Orthodontic Plannings' />
        <meta name='twitter:title' content='planilink' />
        <meta
          name='twitter:description'
          content='planilink plans your plastic orthodontic cases and sends you the sequence of biomodels so that you can make your own aligners on your own.'
        />
        <meta
          name='twitter:image'
          content='https://planilink.com/static/media/planilink.ff9c0a0f2617f374f55206377651b2e9.svg'
        />
        {/* <!-- Tags for twitter --> */}
      </Helmet>

      <div>
        <Banner />
        <RegainControl />
        <MakeItPossible />
        <BoostHorizon />
        <PlanningToChoose />
        <Sleeves />

        <RegainMobile />
        <MakeItPossibleMobile />
        <BoostHorizonMobile />
        <PlanningToChooseMobile />
        <SleevesMobile />
      </div>
    </>
  );
}
export default Home;
