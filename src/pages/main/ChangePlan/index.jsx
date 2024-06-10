import { useState } from "react";
import backArrowCircle from "../../../assets/backArrowCircle.svg";
import editPencelGray from "../../../assets/editPencilGray.svg";
import ChangeProductModal from "../PatientPlanRecords/components/ChangeProductModal";
import cameraGray from "../../../assets/cameraGray.svg";
import medicalFolder from "../../../assets/medicalFolder.svg";
import expandGray from "../../../assets/expandGray.svg";
import downloadSky from "../../../assets/downloadSky.svg";
import PlanCard from "../../../components/common/PlanCard";
import FWButton from "../../../components/form/FWButton";
import { useTranslation } from "react-i18next";
import useHelpers from "../../../hooks/useHelpers";
const ChangePlan = () => {
  const { navigateToPage } = useHelpers();
  const [changeProductModalOpen, setChangeProductModalOpen] = useState(false);
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(1);

  const closeChangePlanModal = () => setChangeProductModalOpen(false);
  return (
    <div className='patientPlans changePlan'>
      <div className='patientPlans__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => navigateToPage("/plannings/patient-plan-record/5")}
        />
      </div>
      <div className='patientPlans__nav'>
        <div className='patientPlans__nav__summaries'>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("changePlan.user")}:</label>
              <span>Rana Utban</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("changePlan.patient")}:</label>
              <span>Patient 1</span>
            </div>
            <span className='color-sky'>{t("changePlan.approval")}</span>
          </div>
          <div className='patientPlans__nav__summary'>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("changePlan.planningNumber")}:</label>
              <span>01</span>
            </div>
            <div className='patientPlans__nav__summary__item'>
              <label>{t("changePlan.product")}:</label>
              <span>1 </span>
              <img
                src={editPencelGray}
                alt=''
                className='cursor-pointer'
                onClick={() => setChangeProductModalOpen(true)}
              />
            </div>
          </div>
        </div>
        <div
          className='w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-pointer'
          style={{ boxShadow: "0px 4px 40px 0px #0000001A" }}
        >
          <img src={cameraGray} alt='' />
        </div>
      </div>

      <div className='changePlan__files shadow-container'>
        <img src={medicalFolder} alt='' />
        <img src={medicalFolder} alt='' />
        <img src={downloadSky} alt='' />
      </div>

      <div className='changePlan__writtenInsts '>
        <h2 className='text-[24px] text-grayish'>
          {t("changePlan.instructions")}
        </h2>
        <div className='shadow-container changePlan__writtenInsts__instructs'>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam hic
            officia harum distinctio, corporis cupiditate officiis animi
            perferendis est ex alias in error quibusdam laboriosam?
          </p>
          <img src={expandGray} alt='' />
        </div>
      </div>

      <div className='changePlan__plans'>
        <h2 className='text-[24px] text-grayish'>{t("changePlan.choose")}</h2>
        <div className='changePlan__plans__plans'>
          <PlanCard
            selected={selectedPlan}
            setSelected={setSelectedPlan}
            id={1}
          />
          <PlanCard
            selected={selectedPlan}
            setSelected={setSelectedPlan}
            id={2}
          />
          <PlanCard
            selected={selectedPlan}
            setSelected={setSelectedPlan}
            id={3}
          />
        </div>
      </div>

      <div className='changePlan__note'>
        <span>{t("changePlan.note")}</span>
      </div>

      <FWButton title={t("changePlan.button")} variant='whiteSky' />

      <ChangeProductModal
        open={changeProductModalOpen}
        handleClose={closeChangePlanModal}
      />
      <div className='mb-6'></div>
    </div>
  );
};

export default ChangePlan;
