import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Import = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Import data</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>
                You can easily import data from any of the following sources.
              </p>
              <p>
                If your data is located somewhere we don't support yet, you can
                try importing it via CSV file.
              </p>
            </div>
          </div>
          <div>{/* <img src="" alt="" /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Import;
