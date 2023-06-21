import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Settings = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Workspace settings</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.container}`}>
            <div className={`${styles.change_name}`}>
              <p>Name</p>
              <form>
                <input type="text" name="" id="" />
                <button>Change name</button>
              </form>
              <p>
                You can use your organization or company name. Keep it simple.
              </p>
            </div>
          </div>
          <div className={`${styles.divider}`}></div>
          <br />
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Icon</p>
              {/* Update Icon here */}
              <p>
                Upload an image or pick an emoji. It will show up in your
                sidebar and notifications.
              </p>
            </div>
          </div>
          <br />
          <div className={`${styles.divider}`}></div>
          <br />
          <br />
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>Public settings</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Domain</p>
              <p>
                Pages shared to web will be under
                endurable-part-ridge-afb.notion.site. Anyone with an allowed
                email domain can join this workspace via
                www.notion.so/endurable-part-ridge-afb.
              </p>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Danger zone</p>
              <p>Delete Entire Workspace</p>
            </div>
            <div className={`${styles.control} ${styles.active_button}`}>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
