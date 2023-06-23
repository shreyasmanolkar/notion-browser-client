import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Connections = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Connections</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Restrict members from adding connections</p>
              <p>Workspace members can install any new connection.</p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="restriction" id="restriction" disabled>
                  <option value="re">Restriction</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>All connections</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p> </p>
              <p>This workspace has no connections yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
