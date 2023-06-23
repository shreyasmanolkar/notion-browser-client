import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { ReactComponent as RightArrowIcon } from "../../../assets/icons/right-arrow.svg";
import styles from "./account.module.scss";

const Members = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Members</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Invite link</p>
              <p>
                Share this secret link to invite people to this workspace. Only
                users who can invite members can see this. You can reset the
                link for all space members to generate a new invite link.
              </p>
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
              <p>Members</p>
              <p>
                Manage members here, or set up a domain, so everyone with
                allowed email domains can join the workspace automatically. You
                will be charged for each member added. Visit our guide for more
                information on how we bill.
              </p>
            </div>
            <div
              className={`${styles.control}`}
              onClick={() =>
                window.open(
                  "https://www.notion.so/help/invoices-and-proration",
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

export default Members;
