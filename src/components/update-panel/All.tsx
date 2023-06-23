import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as InboxIcon } from "../../assets/icons/inbox.svg";
import styles from "./inbox.module.scss";

const All = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.icon}`}>
        <InboxIcon />
      </div>
      <br />
      <p>No updates till now</p>
      <p>
        You'll be notified here for all @mentions, page activity, page invites
        and archived updates
      </p>
    </div>
  );
};

export default All;
