import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as OpenPageIcon } from "../../assets/icons/open-page.svg";
import { ReactComponent as PeekModeIcon } from "../../assets/icons/peek-mode.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as TopUpdateIcon } from "../../assets/icons/top-update.svg";
import { ReactComponent as StarOutlineIcon } from "../../assets/icons/star-outline.svg";
import { ReactComponent as TopDotsIcon } from "../../assets/icons/top-dots.svg";
import styles from "./createPagePanel.module.scss";
import { useAppSelector } from "../../app/hooks";

type CreatePageProps = {
  open: boolean;
  onClose: () => void;
  parentPageId?: string;
};

const CreatePagePanel: React.FC<CreatePageProps> = ({
  open,
  onClose,
  parentPageId,
}) => {
  const { theme } = useContext(ThemeContext);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );

  const pageMetaData = workspaceInfo?.pages.find(
    (page) => page.id === parentPageId
  );

  if (!open) return null;

  return (
    <div
      className={`${styles.create_page_background} ${styles[theme]}`}
      onClick={onClose}
    >
      <div
        className={`${styles.create_page}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.header}`}>
          <div className={`${styles.left_options}`}>
            <div className={`${styles.icon}`}>
              <OpenPageIcon />
            </div>
            <div className={`${styles.icon}`}>
              <PeekModeIcon />
            </div>
            <div className={`${styles.tab_divider}`}>
              <p>|</p>
            </div>
            <div className={`${styles.add_to}`}>
              <div className={`${styles.text}`}>
                <p>Add to</p>
              </div>
              <div className={`${styles.parent_Page_icon}`}></div>
              <div className={`${styles.parent_page_title}`}></div>
            </div>
          </div>
          <div className={`${styles.right_options}`}>
            <div className={`${styles.tab}`}>
              <p>Share</p>
            </div>
            <div className={`${styles.icon}`}>
              <CommentIcon />
            </div>
            <div className={`${styles.icon}`}>
              <TopUpdateIcon />
            </div>
            <div className={`${styles.icon}`}>
              <StarOutlineIcon />
            </div>
            <div className={`${styles.icon}`}>
              <TopDotsIcon />
            </div>
          </div>
        </div>
        <div className={`${styles.body}`}>
          {/* TODO: cover photo */}
          <div className={`${styles.title}`}>
            <div className={`${styles.page_options}`}></div>
          </div>
          <div className={`${styles.title}`}></div>
        </div>
        <div className={`${styles.footer}`}></div>
      </div>
    </div>
  );
};

export default CreatePagePanel;
