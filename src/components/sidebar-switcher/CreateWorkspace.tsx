import React, { useContext } from "react";
import styles from "./createWorkspace.module.scss";
import CreateWorkspacePanel from "../create-workspace-panel";
import { ThemeContext } from "../../context/ThemeContext";

type CreateWorkspaceProps = {
  createWorkspaceOpen: boolean;
  createWorkspaceOnClose: () => void;
};

const CreateWorkspace: React.FC<CreateWorkspaceProps> = ({
  createWorkspaceOpen,
  createWorkspaceOnClose,
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
        <CreateWorkspacePanel />
      </div>
    </div>
  );
};

export default CreateWorkspace;
