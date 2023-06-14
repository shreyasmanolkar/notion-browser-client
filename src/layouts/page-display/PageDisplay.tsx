import { MouseEvent } from "react";
import styles from "./pageDisplay.module.scss";

interface MainSectionProps {
  leftOpen: boolean;
  toggleSidebar: (event: MouseEvent<HTMLDivElement>) => void;
}

const PageDisplay: React.FC<MainSectionProps> = ({
  leftOpen,
  toggleSidebar,
}) => {
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.header}`}>
        <div id="menu_icon" className={`${styles.path}`}>
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
