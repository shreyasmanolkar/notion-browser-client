import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Teamspaces = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Teamspaces settings</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Default teamspaces</p>
              <p>
                Choose teamspaces that all new and current workspace members
                will automatically join
              </p>
            </div>
          </div>
          <div className={`${styles.divider}`}></div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Limit teamspace creation to only workspace owners</p>
              <p>Only allow workspace owners to create teamspaces</p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.switch}`}>
                <input type="checkbox" disabled />
                <span className={`${styles.slider_round}`}></span>
              </label>
            </div>
          </div>
          <div className={`${styles.divider}`}></div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Manage teamspaces</p>
              <p>Manage all teamspaces you have access here</p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.switch}`}>
                <input type="checkbox" disabled />
                <span className={`${styles.slider_round}`}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamspaces;
