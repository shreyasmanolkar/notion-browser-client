import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import twemoji from "twemoji";
import { ReactComponent as DotsIcon } from "../../assets/icons/dots.svg";
import { ReactComponent as DragHandleIcon } from "../../assets/icons/drag-handle.svg";
import HeaderDropdown from "./HeaderDropdown";
import styles from "./switcherDropdown.module.scss";

type SwitcherDropdownProps = {
  open: boolean;
  onClose: () => void;
};

const SwitcherDropdown: React.FC<SwitcherDropdownProps> = ({
  open,
  onClose,
}) => {
  const [openHeaderDropdown, setOpenHeaderDropdown] = useState<boolean>(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );

  if (!open) return null;

  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  return (
    <>
      <div className={`${styles.dropdown_background}`} onClick={onClose}>
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
          <div className={`${styles.display_container}`}>
            {/* tab */}
            <div draggable="true" className={`${styles.workspace_tab}`}>
              <div className={`${styles.workspace_info}`}>
                <div className={`${styles.drag_handle}`}>
                  <DragHandleIcon />
                </div>
                <div className={`${styles.workspace_icon}`}>
                  <img
                    src={getEmojiUrl(workspaceInfo?.icon!)}
                    alt=""
                    draggable="false"
                  />
                </div>
                <div className={`${styles.workspace_title}`}>
                  {workspaceInfo?.name}
                </div>
              </div>
              <div className={`${styles.workspace_check}`}>&#10003;</div>
            </div>
            {/* second tab */}
            <div draggable="true" className={`${styles.workspace_tab}`}>
              <div className={`${styles.workspace_info}`}>
                <div className={`${styles.drag_handle}`}>
                  <DragHandleIcon />
                </div>
                <div className={`${styles.workspace_icon}`}>
                  <img src={getEmojiUrl("1f5fc")} alt="" draggable="false" />
                </div>
                <div className={`${styles.workspace_title}`}>
                  office-workspace
                </div>
              </div>
              <div className={`${styles.workspace_check}`}></div>
            </div>
          </div>
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
