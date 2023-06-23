import { useContext } from "react";
import { SidebarLogicContext } from "../../context/SidebarContext";
import SidebarSwitcher from "../../components/sidebar-switcher";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./leftSidebar.module.scss";
import SidebarBody from "../../components/sidebar-body";

const LeftSidebar = () => {
  const { leftOpen, toggleSidebar } = useContext(SidebarLogicContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      id="left"
      data-testid="left-sidebar"
      className={`${styles.left} ${styles[theme]} ${
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
        <div className={`${styles.content}`}>
          <SidebarBody />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
