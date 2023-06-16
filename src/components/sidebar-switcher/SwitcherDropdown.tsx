import React, { useContext, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { ReactComponent as DotsIcon } from "../../assets/icons/dots.svg";
import HeaderDropdown from "./HeaderDropdown";
import styles from "./switcherDropdown.module.scss";
import WorkspaceDisplayList from "./WorkspaceDisplayList";
import { ThemeContext } from "../../context/ThemeContext";

type SwitcherDropdownProps = {
  open: boolean;
  onClose: () => void;
};

const SwitcherDropdown: React.FC<SwitcherDropdownProps> = ({
  open,
  onClose,
}) => {
  const { theme } = useContext(ThemeContext);
  const [openHeaderDropdown, setOpenHeaderDropdown] = useState<boolean>(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  // const workspaceInfo = useAppSelector(
  //   (state) => state.workspace.workspaceInfo
  // );

  if (!open) return null;

  return (
    <>
      <div
        className={`${styles.dropdown_background} ${styles[theme]}`}
        onClick={onClose}
      >
        <div
          className={`${styles.dropdown}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${styles.header}`}>
            <div className={`${styles.header_title}`}>{userInfo?.email}</div>
            <div
              className={`${styles.dots_icon}`}
              onClick={() => {
                setOpenHeaderDropdown(true);
              }}
            >
              <DotsIcon />
            </div>
          </div>
          <WorkspaceDisplayList />
          <div className={`${styles.options}`}>
            <div className={`${styles.option}`}>Add another account</div>
            <div className={`${styles.option}`}>Log out</div>
            <div className={`${styles.option}`}>Get Mac app</div>
          </div>
        </div>
      </div>
      <HeaderDropdown
        openHeader={openHeaderDropdown}
        onCloseHeader={() => setOpenHeaderDropdown(false)}
      />
    </>
  );
};

export default SwitcherDropdown;
