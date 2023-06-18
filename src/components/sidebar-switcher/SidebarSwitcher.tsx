import { useContext, useEffect, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as ExpandIcon } from "../../assets/icons/expand.svg";
import SwitcherDropdown from "./SwitcherDropdown";
import { useAppSelector } from "../../app/hooks";
import styles from "./sidebarSwitcher.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

const SidebarSwitcher = () => {
  const { theme } = useContext(ThemeContext);
  const [workspaceEmoji, setWorkspaceEmoji] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );

  useEffect(() => {
    const unified = workspaceInfo?.icon;

    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    setWorkspaceEmoji(emojiImage);
  }, [workspaceInfo?.icon]);

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  return (
    <>
      <div
        className={`${styles.sidebar_switcher} ${styles[theme]}`}
        onClick={() => {
          setOpenDropdown(true);
        }}
      >
        <div className={`${styles.icon}`}>
          <img
            src={workspaceEmoji!}
            alt=""
            onError={(e) => handleBrokenImage(e)}
          />
        </div>
        <div className={`${styles.name}`}>{workspaceInfo?.name}</div>
        <div className={`${styles.expand}`}>
          <ExpandIcon />
        </div>
      </div>
      <SwitcherDropdown
        open={openDropdown}
        onClose={() => setOpenDropdown(false)}
      />
    </>
  );
};

export default SidebarSwitcher;
