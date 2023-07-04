import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/nav-bar";
import styles from "./pageDisplay.module.scss";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

const PageDisplay = () => {
  const params = useParams();
  const navigate = useNavigate();
  const pageInfo = useAppSelector((user) => user.page.pageInfo);

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      navigate(`/${pageInfo?.reference}`);
    }
  }, [navigate, pageInfo?.reference, params]);

  useEffect(() => {
    if (
      params.pageReference === "login" ||
      params.pageReference === "register"
    ) {
      navigate(`/${pageInfo?.reference}`);
    }
  }, [navigate, pageInfo?.reference, params.pageReference]);

  return (
    <div className={`${styles.main}`} data-testid="page-display">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PageDisplay;
