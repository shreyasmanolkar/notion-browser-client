import React, { useContext, useState } from "react";
import { ReactComponent as SquarePlusIcon } from "../../assets/icons/square-plus.svg";
import { ReactComponent as CircleCrossIcon } from "../../assets/icons/circle-cross.svg";
import styles from "./headerDropdown.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/userSlice";
import CreateWorkspace from "./CreateWorkspace";

type HeaderDropdownProps = {
  openHeader: boolean;
  onCloseHeader: () => void;
};

// TODO: add create workspace and logout functionalities

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  openHeader,
  onCloseHeader,
}) => {
  const { theme } = useContext(ThemeContext);
  const [openCreateWorkspace, setOpenCreateWorkspace] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // TODO: navigate to register page
  };

  if (!openHeader) return null;

  return (
    <>
      <div
        className={`${styles.header_dropdown_background} ${styles[theme]}`}
        onClick={onCloseHeader}
      >
        <div
          className={`${styles.header_dropdown}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={`${styles.tab}`}
            onClick={() => {
              setOpenCreateWorkspace(true);
            }}
          >
            <div className={`${styles.icon}`}>
              <SquarePlusIcon />
            </div>
            <p>Join or create workspace</p>
          </div>
          <div className={`${styles.tab}`} onClick={handleLogout}>
            <div className={`${styles.icon}`}>
              <CircleCrossIcon />
            </div>
            <p>Log out</p>
          </div>
        </div>
      </div>
      <CreateWorkspace
        createWorkspaceOpen={openCreateWorkspace}
        createWorkspaceOnClose={() => setOpenCreateWorkspace(false)}
      />
    </>
  );
};

export default HeaderDropdown;
