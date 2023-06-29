import Navbar from "../../components/nav-bar";
import styles from "./pageDisplay.module.scss";

const PageDisplay = () => {
  return (
    <div className={`${styles.main}`} data-testid="page-display">
      <Navbar />
      <div className={`${styles.content}`}>
        <div className={`${styles.cover}`}></div>
        <div className={`${styles.page_content}`}></div>
      </div>
    </div>
  );
};

export default PageDisplay;
