import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as NotionLogo } from "../../assets/icons/notion-logo.svg";
import RegisterPanel from "../../components/register-panel";
import styles from "./register.module.scss";

const Register = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.nav}`}>
        <NotionLogo data-testid="notion-logo" className={`${styles.logo}`} />
        <p>Notion</p>
      </div>
      <div className={`${styles.panel}`}>
        <RegisterPanel />
      </div>
    </div>
  );
};

export default Register;
