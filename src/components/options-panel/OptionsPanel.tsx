import React, { useContext, useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as UpdatesIcon } from "../../assets/icons/update.svg";
import { ReactComponent as TeamspacesIcon } from "../../assets/icons/teamspace.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as CirclePlusIcon } from "../../assets/icons/circle-plus.svg";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./optionsPanel.module.scss";
import UpdatePanel from "../update-panel";

const OptionsPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [openUpdatePanel, setOpenUpdatePanel] = useState(false);

  return (
    <>
      <div className={`${styles.options_panel} ${styles[theme]}`}>
        <div className={`${styles.tabs}`}>
          <div className={`${styles.icon}`}>
            <SearchIcon />
          </div>
          <p>Search</p>
        </div>
        <div
          className={`${styles.tabs}`}
          onClick={() => {
            setOpenUpdatePanel(true);
          }}
        >
          <div className={`${styles.icon}`}>
            <UpdatesIcon />
          </div>
          <p>Updates</p>
        </div>
        <div className={`${styles.tabs}`}>
          <div className={`${styles.icon}`}>
            <TeamspacesIcon />
          </div>
          <p>All teamspaces</p>
        </div>
        <div className={`${styles.tabs}`}>
          <div className={`${styles.icon}`}>
            <SettingsIcon />
          </div>
          <p>Settings & members</p>
        </div>
        <div className={`${styles.tabs}`}>
          <div className={`${styles.icon}`}>
            <CirclePlusIcon />
          </div>
          <p>New page</p>
        </div>
      </div>
      <UpdatePanel
        open={openUpdatePanel}
        onClose={() => setOpenUpdatePanel(false)}
      />
    </>
  );
};

export default OptionsPanel;
