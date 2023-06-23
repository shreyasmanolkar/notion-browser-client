import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as InboxIcon } from "../../assets/icons/inbox.svg";
import styles from "./inbox.module.scss";

const Archived = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.icon}`}>
        <InboxIcon />
      </div>
      <br />
      <p>No archived updates</p>
      <p>Any Inbox updates you archived will show up here.</p>
    </div>
  );
};

export default Archived;
