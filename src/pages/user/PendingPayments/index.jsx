import { useTranslation } from "react-i18next";
import useHelpers from "../../../hooks/useHelpers";
import backArrowCircle from "../../../assets/backArrowCircle.svg";
import SmButton from "../../../components/form/SmButton";
import Table from "../../../components/common/Table";
import { userPendingPaymentsMockData } from "../../../shared/mock";

const PendingPayments = () => {
  const { t } = useTranslation();
  const { navigateToPage } = useHelpers();
  return (
    <div className='patientPlans'>
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => navigateToPage("/user/patient-plans/5")}
        />
      </div>
      <div className='patientPlans__nav'>
        <div className='patientPlans__nav__summaries'>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("patientPlanTreatments.patient")}:</label>
              <span>Patient 1</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("patientPlanTreatments.product")}:</label>
              <span>2</span>
            </div>
          </div>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("patientPlanTreatments.planningNumber")}:</label>
              <span>01</span>
            </div>

            <span className='color-sky'>
              {t("patientPlanTreatments.approval")}
            </span>
          </div>
        </div>
        <div className='flex gap-4'>
          <SmButton
            titleComplete={t("patientPlanTreatments.newInstructions")}
            variant='medium'
            style={{ background: "#FFD966", color: "#12083A" }}
            onClick={() => navigateToPage("/user/plan-instructions/5")}
          />
        </div>
      </div>
      <Table
        data={userPendingPaymentsMockData.data}
        headings={userPendingPaymentsMockData.headings}
      />
    </div>
  );
};

export default PendingPayments;
