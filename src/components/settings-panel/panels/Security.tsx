import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Security = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Security</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Disable public page sharing</p>
              <p>
                Disable the Share to web option in the Share menu on every page
                in this workspace.
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.switch}`}>
                <input type="checkbox" disabled />
                <span className={`${styles.slider_round}`}></span>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Disable guests</p>
              <p>
                Prevent anyone from inviting people outside the workspace to
                pages.
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.switch}`}>
                <input type="checkbox" disabled />
                <span className={`${styles.slider_round}`}></span>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Disable duplicating pages to other workspaces</p>
              <p>
                Prevent anyone from duplicating pages to other workspaces via
                the Move To or Duplicate To actions.
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.switch}`}>
                <input type="checkbox" disabled />
                <span className={`${styles.slider_round}`}></span>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Disable export</p>
              <p>Prevent anyone from exporting as Markdown, CSV, or PDF.</p>
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

export default Security;
