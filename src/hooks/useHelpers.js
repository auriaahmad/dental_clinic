import { useNavigate } from "react-router";

const useHelpers = () => {
  const navigate = useNavigate();

  const navigateToPage = path => navigate(path);

  return { navigateToPage };
};

export default useHelpers;
