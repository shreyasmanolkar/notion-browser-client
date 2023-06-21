import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { ReactComponent as RightArrowIcon } from "../../../assets/icons/right-arrow.svg";
import styles from "./account.module.scss";

const MyConnections = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Discover new connections</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>My Connections</p>
              <p>Learn more about connections</p>
            </div>
            <div
              className={`${styles.control}`}
              onClick={() =>
                window.open(
                  "https://www.notion.so/help/add-and-manage-connections-with-the-api",
                  "blank"
                )
              }
            >
              <div className={`${styles.icon}`}>
                <RightArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyConnections;
