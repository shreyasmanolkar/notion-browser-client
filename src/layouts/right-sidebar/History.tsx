import React, { useContext } from "react";
import styles from "./comment.module.scss";
import { ReactComponent as DownExpandIcon } from "../../assets/icons/down-expand.svg";
import { ThemeContext } from "../../context/ThemeContext";

const History = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.header}`}>
        <p>History</p>
        <div className={`${styles.button}`}>
          <p>Open</p>
          <div className={`${styles.icon}`}>
            <DownExpandIcon />
          </div>
        </div>
      </div>
      <div className={`${styles.body}`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.icon}`}></div>
          <p>No updated History yet</p>
          <p>complete History of this workspace will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default History;
