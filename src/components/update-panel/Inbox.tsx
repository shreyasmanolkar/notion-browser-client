import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as InboxIcon } from "../../assets/icons/inbox.svg";
import styles from "./inbox.module.scss";

const Inbox = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.icon}`}>
        <InboxIcon />
      </div>
      <br />
      <p>You're all caught up</p>
      <p>
        You'll be notified here for @mentions, page activity, and page invites
      </p>
    </div>
  );
};

export default Inbox;
