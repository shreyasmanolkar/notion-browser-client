import { MouseEvent } from "react";
import styles from "./rightSidebar.module.scss";

interface RightSidebarProps {
  rightOpen: boolean;
  toggleSidebar: (event: MouseEvent<HTMLDivElement>) => void;
  rightPanelContent: string | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  rightOpen,
  toggleSidebar,
  rightPanelContent,
}) => {
  return (
    <div
      id="right"
      className={`${styles.right} ${
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
          {rightPanelContent === "comment" ? <p>Comment</p> : <p>History</p>}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
