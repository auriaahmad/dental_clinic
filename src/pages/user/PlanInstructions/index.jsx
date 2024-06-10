import backArrowCircle from "../../../assets/backArrowCircle.svg";
import expandGray from "../../../assets/expandGray.svg";
import downloadSky from "../../../assets/downloadSky.svg";
import crossGray from "../../../assets/crossGray.svg";
import SmButton from "../../../components/form/SmButton";
import { useTranslation } from "react-i18next";
import useHelpers from "../../../hooks/useHelpers";

const PlanInstructions = () => {
  const { t } = useTranslation();
  const { navigateToPage } = useHelpers();

  return (
    <div className='patientPlans changePlan'>
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => navigateToPage("/user/pending-payments")}
        />
      </div>
      <div className='patientPlans__nav'>
        <div className='patientPlans__nav__summaries'>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("planInstructions.patient")}:</label>
              <span>Patient 1</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("planInstructions.product")}:</label>
              <span>2</span>
            </div>
          </div>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("planInstructions.planningNumber")}:</label>
              <span>01</span>
            </div>

            <span className='color-sky'>{t("planInstructions.approval")}</span>
          </div>
        </div>
      </div>

      <div className='changePlan__files shadow-container'>
        <h3 className='heading-3'>{t("planInstructions.services")}</h3>
        <img
          src={crossGray}
          alt=''
          className='absolute cursor-pointer top-4 right-4 w-[1.125rem] h-[1.125rem]'
        />
        <img
          src={downloadSky}
          alt=''
          className='absolute bottom-4 cursor-pointer right-4 w-[1.125rem] h-[1.125rem]'
        />
      </div>

      <div className='changePlan__writtenInsts '>
        <h2 className='text-[24px] text-grayish'>{t("planInstructions.WI")}</h2>
        <div className='shadow-container changePlan__writtenInsts__instructs'>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam hic
            officia harum distinctio, corporis cupiditate officiis animi
            perferendis est ex alias in error quibusdam laboriosam?
          </p>
          <img src={expandGray} alt='' />
        </div>
      </div>

      <div className='w-full flex justify-center py-[51px]'>
        <SmButton
          style={styles.sendBtnStyle}
          variant='medium'
          titleComplete={t("planInstructions.title")}
        />
      </div>
    </div>
  );
};

const styles = {
  sendBtnStyle: {
    width: "171px",
    height: "48px",
  },
};

export default PlanInstructions;
