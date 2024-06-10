import backArrowCircle from "../../../assets/backArrowCircle.svg";
import useHelpers from "../../../hooks/useHelpers";
import QueryChat from "./components/QueryChat";
import { useTranslation } from "react-i18next";

const UserQuery = () => {
  const { t } = useTranslation();
  const { navigateToPage } = useHelpers();
  return (
    <div className='query'>
      <div className='query__header'>
        <img
          src={backArrowCircle}
          alt=''
          className='cursor-pointer'
          onClick={() => navigateToPage("/user/queries")}
        />
      </div>
      <h2 className='heading-2'>{t("queries.Query")}</h2>

      <QueryChat />
    </div>
  );
};

export default UserQuery;
