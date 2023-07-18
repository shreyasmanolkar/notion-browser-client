import React, { useContext } from "react";
import styles from "./createWorkspace.module.scss";
import CreateWorkspacePanel from "../create-workspace-panel";
import { ThemeContext } from "../../context/ThemeContext";

type CreateWorkspaceProps = {
  createWorkspaceOpen: boolean;
  createWorkspaceOnClose: () => void;
  headerOnClose: () => void;
  onCloseSwitcherDropDown: () => void;
};

const CreateWorkspace: React.FC<CreateWorkspaceProps> = ({
  createWorkspaceOpen,
  createWorkspaceOnClose,
  headerOnClose,
  onCloseSwitcherDropDown,
}) => {
  const { theme } = useContext(ThemeContext);

  if (!createWorkspaceOpen) return null;

  return (
    <div
      className={`${styles.create_workspace_background} ${styles[theme]}`}
      onClick={createWorkspaceOnClose}
    >
      <div
        className={`${styles.create_workspace}`}
        onClick={(e) => e.stopPropagation()}
      >
        <CreateWorkspacePanel
          createWorkspaceOnClose={createWorkspaceOnClose}
          headerOnClose={headerOnClose}
          onCloseSwitcherDropDown={onCloseSwitcherDropDown}
        />
      </div>
    </div>
  );
};

export default CreateWorkspace;
