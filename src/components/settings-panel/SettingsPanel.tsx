import React, { useContext, useState } from "react";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/notification.svg";
import { ReactComponent as ConnectAppIcon } from "../../assets/icons/connect-app.svg";
import { ReactComponent as SettingsLanguageIcon } from "../../assets/icons/settings-language.svg";
import { ReactComponent as SettingsOutlineIcon } from "../../assets/icons/setting-outline.svg";
import { ReactComponent as TeamspacesIcon } from "../../assets/icons/teamspace.svg";
import { ReactComponent as MembersIcon } from "../../assets/icons/members.svg";
import { ReactComponent as UpgradeIcon } from "../../assets/icons/upgrade.svg";
import { ReactComponent as BillingIcon } from "../../assets/icons/billing.svg";
import { ReactComponent as SecurityIcon } from "../../assets/icons/security.svg";
import { ReactComponent as IdentityIcon } from "../../assets/icons/identity.svg";
import { ReactComponent as ConnectionIcon } from "../../assets/icons/connection.svg";
import { ReactComponent as ImportIcon } from "../../assets/icons/import.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";
import Account from "./panels/Account";
import Notification from "./panels/Notification";
import MyConnections from "./panels/MyConnections";
import Languages from "./panels/Languages";
import Settings from "./panels/Settings";
import Teamspaces from "./panels/Teamspaces";
import Members from "./panels/Members";
import Upgrade from "./panels/Upgrade";
import Billing from "./panels/Billing";
import Security from "./panels/Security";
import Identity from "./panels/Identity";
import Connections from "./panels/Connections";
import Import from "./panels/Import";
import styles from "./settingsPanel.module.scss";

type SettingsPanelProps = {
  open: boolean;
  onClose: () => void;
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [activeTab, setActiveTab] = useState("my-account");

  if (!open) return null;

  return (
    <div
      className={`${styles.settings_panel_background} ${styles[theme]}`}
      onClick={onClose}
    >
      <div
        className={`${styles.settings_panel}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`${styles.sidebar}`}>
          <div className={`${styles.account}`}>
            <div className={`${styles.title}`}>Account</div>
            <div className={`${styles.info_tab}`}>
              <div className={`${styles.icon}`}>
                <img src={`${userInfo?.profilePicture.url}`} alt="dp" />
              </div>
              <div>
                <div className={`${styles.name}`}>
                  <p>{userInfo?.name}</p>
                </div>
                <div className={`${styles.email}`}>
                  <p>{userInfo?.email}</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "my-account" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("my-account")}
            >
              <div className={`${styles.icon}`}>
                <UserIcon />
              </div>
              <p>My account</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "my-notifications" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("my-notifications")}
            >
              <div className={`${styles.icon}`}>
                <NotificationIcon />
              </div>
              <p>My notifications & settings</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "my-connections" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("my-connections")}
            >
              <div className={`${styles.icon}`}>
                <ConnectAppIcon />
              </div>
              <p>My connections</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "languages" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("languages")}
            >
              <div className={`${styles.icon}`}>
                <SettingsLanguageIcon />
              </div>
              <p>Language & region</p>
            </div>
          </div>
          <div className={`${styles.workspace}`}>
            <div className={`${styles.title}`}>Workspace</div>
            <div
              className={`${styles.tabs} ${
                activeTab === "settings" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <div className={`${styles.icon}`}>
                <SettingsOutlineIcon />
              </div>
              <p>Settings</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "teamspaces" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("teamspaces")}
            >
              <div className={`${styles.icon}`}>
                <TeamspacesIcon />
              </div>
              <p>Teamspaces</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "members" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("members")}
            >
              <div className={`${styles.icon}`}>
                <MembersIcon />
              </div>
              <p>Members</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "upgrade" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("upgrade")}
            >
              <div className={`${styles.icon}`}>
                <UpgradeIcon />
              </div>
              <p>Upgrade</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "billing" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("billing")}
            >
              <div className={`${styles.icon}`}>
                <BillingIcon />
              </div>
              <p>Billing</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "security" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              <div className={`${styles.icon}`}>
                <SecurityIcon />
              </div>
              <p>Security</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "identity" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("identity")}
            >
              <div className={`${styles.icon}`}>
                <IdentityIcon />
              </div>
              <p>Identity & Provisioning</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "connections" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("connections")}
            >
              <div className={`${styles.icon}`}>
                <ConnectionIcon />
              </div>
              <p>Connections</p>
            </div>
            <div
              className={`${styles.tabs} ${
                activeTab === "import" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("import")}
            >
              <div className={`${styles.icon}`}>
                <ImportIcon />
              </div>
              <p>Import</p>
            </div>
          </div>
        </div>
        <div className={`${styles.body}`}>
          {(() => {
            if (activeTab === "my-account") {
              return <Account />;
            } else if (activeTab === "my-notifications") {
              return <Notification />;
            } else if (activeTab === "my-connections") {
              return <MyConnections />;
            } else if (activeTab === "languages") {
              return <Languages />;
            } else if (activeTab === "settings") {
              return <Settings />;
            } else if (activeTab === "teamspaces") {
              return <Teamspaces />;
            } else if (activeTab === "members") {
              return <Members />;
            } else if (activeTab === "upgrade") {
              return <Upgrade />;
            } else if (activeTab === "billing") {
              return <Billing />;
            } else if (activeTab === "security") {
              return <Security />;
            } else if (activeTab === "identity") {
              return <Identity />;
            } else if (activeTab === "connections") {
              return <Connections />;
            } else if (activeTab === "import") {
              return <Import />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
