import React, { useContext, useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as UpdatesIcon } from "../../assets/icons/update.svg";
import { ReactComponent as TeamspacesIcon } from "../../assets/icons/teamspace.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as CirclePlusIcon } from "../../assets/icons/circle-plus.svg";
import { ThemeContext } from "../../context/ThemeContext";
import UpdatePanel from "../update-panel";
import SettingsPanel from "../settings-panel";
import styles from "./optionsPanel.module.scss";
import CreatePagePanel from "../create-Page-panel/CreatePagePanel";
import SearchPanel from "../../features/search";

const OptionsPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [openUpdatePanel, setOpenUpdatePanel] = useState(false);
  const [openSettingsPanel, setOpenSettingsPanel] = useState(false);
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [openSearchPanel, setOpenSearchPanel] = useState(false);

  return (
    <>
      <div className={`${styles.options_panel} ${styles[theme]}`}>
        <div
          className={`${styles.tabs}`}
          onClick={() => {
            setOpenSearchPanel(true);
          }}
        >
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
        <div className={`${styles.tabs} ${styles.invalid}`}>
          <div className={`${styles.icon}`}>
            <TeamspacesIcon />
          </div>
          <p title="Time mocks my plans">All teamspaces</p>
        </div>
        <div
          className={`${styles.tabs}`}
          onClick={() => {
            setOpenSettingsPanel(true);
          }}
        >
          <div className={`${styles.icon}`}>
            <SettingsIcon />
          </div>
          <p>Settings & members</p>
        </div>
        <div
          className={`${styles.tabs}`}
          onClick={() => {
            setOpenCreatePage(true);
          }}
        >
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
      <SettingsPanel
        open={openSettingsPanel}
        onClose={() => setOpenSettingsPanel(false)}
      />
      <CreatePagePanel
        open={openCreatePage}
        onClose={() => setOpenCreatePage(false)}
      />
      <SearchPanel
        open={openSearchPanel}
        onClose={() => setOpenSearchPanel(false)}
      />
    </>
  );
};

export default OptionsPanel;
