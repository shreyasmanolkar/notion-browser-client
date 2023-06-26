import React, { useContext } from "react";
import { ReactComponent as TemplateIcon } from "../../assets/icons/template.svg";
import { ReactComponent as ImportIcon } from "../../assets/icons/import.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./sidebarFooter.module.scss";

const SidebarFooter = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.sidebar_footer} ${styles[theme]}`}>
      <div className={`${styles.tabs} ${styles.invalid}`}>
        <div className={`${styles.icon}`}>
          <TemplateIcon />
        </div>
        <p title="Time mocks my plans">Template</p>
      </div>
      <div className={`${styles.tabs} ${styles.invalid}`}>
        <div className={`${styles.icon}`}>
          <ImportIcon />
        </div>
        <p title="Time mocks my plans">Import</p>
      </div>
      <div className={`${styles.tabs} ${styles.invalid}`}>
        <div className={`${styles.icon}`}>
          <TrashIcon />
        </div>
        <p title="Time mocks my plans">Trash</p>
      </div>
    </div>
  );
};

export default SidebarFooter;
