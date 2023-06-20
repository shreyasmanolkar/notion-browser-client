import React, { useContext } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ReactComponent as RightArrowIcon } from "../../../assets/icons/right-arrow.svg";
import styles from "./account.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";

const Account = () => {
  const { theme } = useContext(ThemeContext);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>My profile</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.container}`}>
            <div className={`${styles.profile_picture}`}>
              {/* TODO: add feature to upload picture */}
              <img src={`${userInfo?.profilePicture.url}`} alt="dp" />
              <p>Add Photo</p>
            </div>
            <div className={`${styles.change_name}`}>
              <p>Preferred name</p>
              <form>
                <input type="text" name="" id="" />
                <button>Change name</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>Account security</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Email</p>
              <p>shreyasmanolkar123@gmail.com</p>
            </div>
            <div className={`${styles.control}`}>
              <button>Change email</button>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Password</p>
              <p>Set a permanent password to login to your account.</p>
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
              <p>2-step verification</p>
              <p>
                Add an additional layer of security to your account during
                login.
              </p>
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
      <div>
        <div className={`${styles.title}`}>Support</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Support access</p>
              <p>
                Grant Notion support temporary access to your account so we can
                troubleshoot problems or recover content on your behalf. You can
                revoke access at any time.
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
              <p>Log out of all devices</p>
              <p>
                Log out of all other active sessions on other devices besides
                this one.
              </p>
            </div>
            <div className={`${styles.control}`}>
              <div className={`${styles.icon}`}>
                <RightArrowIcon />
              </div>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p className={`${styles.danger}`}>Delete my account</p>
              <p>
                Permanently delete the account and remove access from all
                workspace.
              </p>
            </div>
            <div className={`${styles.control}`}>
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

export default Account;
