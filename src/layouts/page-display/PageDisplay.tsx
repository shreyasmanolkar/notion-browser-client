import Navbar from "../../components/nav-bar";
import PageBody from "../../components/page-body";
import styles from "./pageDisplay.module.scss";

const PageDisplay = () => {
  return (
    <div className={`${styles.main}`} data-testid="page-display">
      <Navbar />
      <PageBody />
    </div>
  );
};

export default PageDisplay;
