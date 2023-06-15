import { useContext } from "react";
import styles from "./leftSidebar.module.scss";
import { SidebarLogicContext } from "../../context/SidebarContext";

const LeftSidebar = () => {
  const { leftOpen, toggleSidebar } = useContext(SidebarLogicContext);

  return (
    <div
      id="left"
      data-testid="left-sidebar"
      className={`${styles.left} ${
        leftOpen ? styles.left_open : styles.left_closed
      }`}
    >
      <div className={`${styles.sidebar} ${leftOpen ? "open" : "closed"}`}>
        <div
          id="left_header"
          className={`${styles.header}`}
          data-testid="left-header"
        >
          <div className={`${styles.title_container}`}>
            <p>Workspace</p>
          </div>
          <div
            data-testid="toggle-left-icon"
            className={`${styles.icon}`}
            onClick={toggleSidebar}
          >
            &#171;
          </div>
        </div>
        <div className={`${styles.content}`}></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
