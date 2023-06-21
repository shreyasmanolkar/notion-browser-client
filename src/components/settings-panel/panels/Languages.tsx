import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Languages = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Language & region</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Language</p>
              <p>Change the language used in the user interface.</p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="language" id="language" disabled>
                  <option value="en">English</option>
                  <option value="ko">한국어</option>
                  <option value="jp">日本語</option>
                  <option value="fr">Français</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="sp">Español</option>
                  <option value="po">Português</option>
                </select>
              </label>
            </div>
          </div>
          <div className={`${styles.divider}`}></div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Start week on Monday</p>
              <p>This will change how all calendars in your app look.</p>
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

export default Languages;
