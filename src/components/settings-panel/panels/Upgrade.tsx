import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { ReactComponent as RightArrowIcon } from "../../../assets/icons/right-arrow.svg";
import styles from "./account.module.scss";

const Upgrade = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Upgrade</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Upgrade your plan</p>
              <p>
                We offer four different pricing plans for every type of user and
                team.
              </p>
            </div>
            <div
              className={`${styles.control}`}
              onClick={() =>
                window.open(
                  "https://www.notion.so/help/upgrade-or-downgrade-your-plan",
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

export default Upgrade;
