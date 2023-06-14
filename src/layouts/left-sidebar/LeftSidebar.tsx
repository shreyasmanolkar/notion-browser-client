import { MouseEvent } from "react";
import styles from "./leftSidebar.module.scss";

interface LeftSidebarProps {
  leftOpen: boolean;
  toggleSidebar: (event: MouseEvent<HTMLDivElement>) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  leftOpen,
  toggleSidebar,
}) => {
  return (
    <div
      id="left"
      className={`${styles.left} ${
        leftOpen ? styles.left_open : styles.left_closed
      }`}
    >
      <div className={`${styles.sidebar} ${leftOpen ? "open" : "closed"}`}>
        <div id="left_header" className={`${styles.header}`}>
          <div className={`${styles.title_container}`}>
            <p>Workspace</p>
          </div>
          <div className={`${styles.icon}`} onClick={toggleSidebar}>
            &#171;
          </div>
        </div>
        <div className={`${styles.content}`}></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
