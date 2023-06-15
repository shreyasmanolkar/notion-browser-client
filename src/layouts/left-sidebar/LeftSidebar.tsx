import { useContext } from "react";
import { SidebarLogicContext } from "../../context/SidebarContext";
import SidebarSwitcher from "../../components/sidebar-switcher";
import styles from "./leftSidebar.module.scss";

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
          <SidebarSwitcher />
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
