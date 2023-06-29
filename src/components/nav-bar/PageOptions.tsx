import React, { useContext } from "react";
import styles from "./pageOptions.module.scss";
import { ReactComponent as LoopIcon } from "../../assets/icons/loop.svg";
import { ReactComponent as MoveToIcon } from "../../assets/icons/move-to.svg";
import { ReactComponent as CustomizeIcon } from "../../assets/icons/customize.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg";
import { ReactComponent as DuplicateIcon } from "../../assets/icons/duplicate.svg";
import { ReactComponent as UndoIcon } from "../../assets/icons/undo.svg";
import { ReactComponent as PageHistortyIcon } from "../../assets/icons/page-history.svg";
import { ReactComponent as PageAnalyticsIcon } from "../../assets/icons/page-analytics.svg";
import { ReactComponent as ShowDeletedPagesIcon } from "../../assets/icons/show-deleted-pages.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as ImportIcon } from "../../assets/icons/import.svg";
import { ReactComponent as ExportIcon } from "../../assets/icons/export.svg";
import { ThemeContext } from "../../context/ThemeContext";

type PageOptionsProps = {
  open: boolean;
  onClose: () => void;
};

const PageOptions: React.FC<PageOptionsProps> = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext);

  if (!open) return null;

  return (
    <>
      <div
        className={`${styles.page_options_background} ${styles[theme]}`}
        onClick={onClose}
      >
        <div
          className={`${styles.page_options}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${styles.style_container}`}>
            <p className={`${styles.style}`}>Style</p>
            <div className={`${styles.fonts}`}>
              <div className={`${styles.default} ${styles.active}`}>
                <h2>Ag</h2>
                <p>Default</p>
              </div>
              <div className={`${styles.serif}`}>
                <h2>Ag</h2>
                <p>Serif</p>
              </div>
              <div className={`${styles.mono}`}>
                <h2>Ag</h2>
                <p>Mono</p>
              </div>
            </div>
          </div>
          <div className={`${styles.text}`}>
            <div className={`${styles.value_control}`}>
              <div className={`${styles.key}`}>
                <p>Small text</p>
              </div>
              <div className={`${styles.control}`}>
                <label className={`${styles.switch}`}>
                  <input type="checkbox" />
                  <span className={`${styles.slider_round}`}></span>
                </label>
              </div>
            </div>
            <div className={`${styles.value_control}`}>
              <div className={`${styles.key}`}>
                <p>Full width</p>
              </div>
              <div className={`${styles.control}`}>
                <label className={`${styles.switch}`}>
                  <input type="checkbox" />
                  <span className={`${styles.slider_round}`}></span>
                </label>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <LoopIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Turn into wiki</p>
                <p>Organize by owner, tags, verification, and more</p>
              </div>
              <div className={`${styles.new_button}`}>
                <p>new</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <MoveToIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Move To</p>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <CustomizeIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Customize page</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <LockIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Lock page</p>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <StarIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Add to Favorites</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <LinkIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Copy link</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <DuplicateIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Duplicate</p>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <UndoIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Undo</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <PageHistortyIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Page history</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <PageAnalyticsIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Page analytics</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <ShowDeletedPagesIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Show deleted pages</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <DeleteIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Delete</p>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <ImportIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Import</p>
              </div>
            </div>
            <div className={`${styles.tab}`}>
              <div className={`${styles.icon}`}>
                <ExportIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Export</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageOptions;
