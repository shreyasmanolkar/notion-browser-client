import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Billing = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Billing</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Workspace balance</p>
              <p></p>
            </div>
            <div className={`${styles.control}`}>
              <p>$0</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>Invoices</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p> </p>
              <p>This workspace has no payments yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
