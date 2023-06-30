import React, { useContext } from "react";
import styles from "./comment.module.scss";
import { ReactComponent as CommentSidebarIcon } from "../../assets/icons/comment-sidebar.svg";
import { ReactComponent as DownExpandIcon } from "../../assets/icons/down-expand.svg";
import { ThemeContext } from "../../context/ThemeContext";

const Comment = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.header}`}>
        <p>Comments</p>
        <div className={`${styles.button}`}>
          <p>Open</p>
          <div className={`${styles.icon}`}>
            <DownExpandIcon />
          </div>
        </div>
      </div>
      <div className={`${styles.body}`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.icon}`}>
            <CommentSidebarIcon />
          </div>
          <p>No open comments yet</p>
          <p>Open comments on this page will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
