import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as NotionLogo } from "../../assets/icons/notion-logo.svg";
import { ReactComponent as EyesIcon } from "../../assets/icons/eyes.svg";
import styles from "./not-found.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.nav}`}>
        <NotionLogo data-testid="notion-logo" className={`${styles.logo}`} />
        <p>Notion</p>
      </div>
      <div className={`${styles.not_found_panel}`}>
        <EyesIcon data-testid="eyes-icon" className={`${styles.eyes}`} />
        <p>This content does not exist</p>
        <button onClick={() => navigate(-1)}>Back to my content</button>
        <Link to="/login" className={`${styles.link}`}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
