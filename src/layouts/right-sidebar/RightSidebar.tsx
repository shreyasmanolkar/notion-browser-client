import { useContext } from "react";
import styles from "./rightSidebar.module.scss";
import { SidebarLogicContext } from "../../context/SidebarContext";
import Comment from "./Comment";
import History from "./History";
import { ThemeContext } from "../../context/ThemeContext";

const RightSidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { rightOpen, rightPanelContent, toggleSidebar } =
    useContext(SidebarLogicContext);

  return (
    <div
      id="right"
      data-testid="right-sidebar"
      className={`${styles.right} ${styles[theme]} ${
        rightOpen ? styles.right_open : styles.right_closed
      }`}
    >
      <div className={`${styles.sidebar} ${rightOpen ? "open" : "closed"}`}>
        <div id="right_header" className={`${styles.header}`}>
          <div className={`${styles.icon}`} onClick={toggleSidebar}>
            &#187;
          </div>
        </div>
        <div className={`${styles.content}`}>
          {rightPanelContent === "comment" ? <Comment /> : <History />}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
