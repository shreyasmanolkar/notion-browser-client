import { useContext } from "react";
import styles from "./pageDisplay.module.scss";
import { SidebarLogicContext } from "../../context/SidebarContext";

const PageDisplay = () => {
  const { leftOpen, toggleSidebar } = useContext(SidebarLogicContext);

  return (
    <div className={`${styles.main}`} data-testid="page-display">
      <div className={`${styles.header}`}>
        <div
          id="menu_icon"
          className={`${styles.path}`}
          data-testid="menu-icon"
        >
          {!leftOpen && (
            <div className={`${styles.on_menu_icon}`} onClick={toggleSidebar}>
              &equiv;
            </div>
          )}
          <h3>Page Title</h3>
        </div>
        <div id="options" className={`${styles.main_options}`}>
          <p>Edited At</p>
          <p>Share</p>
          <div
            id="history"
            className={`${styles.history}`}
            onClick={toggleSidebar}
          >
            &#9830;
          </div>
          <p>History</p>
          <div
            id="comment"
            className={`${styles.comments}`}
            onClick={toggleSidebar}
          >
            &#9733;
          </div>
          <p>options</p>
        </div>
      </div>
      <div className={`${styles.content}`}>
        <div className={`${styles.cover}`}></div>
        <div className={`${styles.page_content}`}></div>
      </div>
    </div>
  );
};

export default PageDisplay;
