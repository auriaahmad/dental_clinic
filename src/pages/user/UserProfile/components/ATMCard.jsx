import atmCard from "../../../../assets/atmCard.svg";
import { useTranslation } from "react-i18next";

const ATMCard = () => {
  const {t} = useTranslation();
  return (
    <div className='flex w-[400px] gap-[10px]'>
      <img src={atmCard} alt='' className='w-[158px] h-[98.5px]' />
      <div className='flex flex-col '>
        <h5 className='heading-5'>{t("atmCard.euro")}Euro 600 VISA</h5>
        <p className='text-sm font-normal text-grayish'>
          Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
          consectetur.
        </p>
      </div>
    </div>
  );
};

export default ATMCard;
