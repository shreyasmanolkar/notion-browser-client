import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";

const Identity = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>Domain management</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Verified domains</p>
              <p>
                Verify ownership of an email domain to access advanced security
                features including single-sign on.
              </p>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Workspace creation</p>
              <p>Customize who can create new workspaces.</p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="workspace" id="workspace" disabled>
                  <option value="wo">Owner</option>
                  <option value="ko">Members</option>
                </select>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Claim workspaces</p>
              <p>
                Claim workspaces created by users with a verified domain or
                require owners to use an external domain.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>SAML Single sign-on (SSO)</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Enable SAML SSO</p>
              <p>
                Anyone using email addresses with a verified domain can log in
                via SAML SSO.
              </p>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Login method</p>
              <p>Customize how users access SAML SSO-enabled workspaces.</p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="login" id="login" disabled>
                  <option value="wo">Any</option>
                  <option value="ko">New</option>
                </select>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Automatic account creation</p>
              <p>
                Automatically create Notion accounts for new users who log in
                via SAML SSO.
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
              <p>Linked workspaces</p>
              <p>
                This SAML SSO configuration applies to the following other
                workspaces.{" "}
                <span>
                  <a href="/" target="blank">
                    Contact Support
                  </a>
                </span>{" "}
                to add or remove a workspace.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>SCIM provisioning</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>SCIM tokens</p>
              <p>Generate a token to configure SCIM.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>Setup information</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p></p>
              <p>Workspace ID</p>
            </div>
            <div className={`${styles.control}`}>
              {/* workspaceId */}
              <p>workspaceId</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Identity;
