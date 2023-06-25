import React, { useContext } from "react";
import { useWorkspaceData } from "../../services/useWorkspaceData";
import styles from "./pageDropdown.module.scss";
import { PageType } from "../../slice/workspaceSlice";
import { ReactComponent as RightExpanIcon } from "../../assets/icons/right-expand.svg";
import { ReactComponent as PlusThickIcon } from "../../assets/icons/plus-thick.svg";
import twemoji from "twemoji";
import { ThemeContext } from "../../context/ThemeContext";

type PageDropdownProps = {
  workspaceId: string;
  pageReference: string;
};

const PageDropdown: React.FC<PageDropdownProps> = ({
  workspaceId,
  pageReference,
}) => {
  const { theme } = useContext(ThemeContext);
  const { data: childPagesOrNull, isLoading } =
    useWorkspaceData.useFetchChildPagesByworkspaceIdAndPageReference(
      workspaceId,
      pageReference
    );

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  const handleExpand = (e: React.SyntheticEvent<HTMLDivElement>) => {
    // const currentRotation = e.currentTarget.style.transform;
    // const currentRotationValue = parseInt(currentRotation.slice(7), 10);
    // if (currentRotationValue === 90) {
    //   e.currentTarget.style.transform = "rotate(0deg)";
    // } else {
    //   e.currentTarget.style.transform = "rotate(90deg)";
    // }
  };

  const handleAddPage = () => {
    console.log("add page");
  };

  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={`${styles.page_dropdown} ${styles[theme]}`}>
          {!childPagesOrNull ? (
            <div className={`${styles.no_content}`}>
              <p>No pages inside</p>
            </div>
          ) : (
            <div className={`${styles.child_pages}`}>
              {childPagesOrNull.map((item: PageType, index: number) => (
                <div className={`${styles.page_tab}`} key={index}>
                  <div className={`${styles.page_info}`}>
                    <label
                      htmlFor={`page_tab_display_${item.id}`}
                      className={`${styles.dropdown}`}
                    >
                      <div
                        className={`${styles.collapse_handle}`}
                        onClick={handleExpand}
                      >
                        <RightExpanIcon />
                      </div>
                    </label>
                    <div className={`${styles.page_emoji}`}>
                      <img
                        src={getEmojiUrl(item.icon)}
                        onError={(e) => handleBrokenImage(e)}
                        alt=""
                        draggable="false"
                      />
                    </div>
                    <div className={`${styles.page_title}`}>{item.title}</div>
                    <div className={`${styles.page_settings}`}>
                      <div
                        className={`${styles.add_icon}`}
                        onClick={handleAddPage}
                      >
                        <PlusThickIcon />
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className={`${styles.toggle_checkbox}`}
                    id={`page_tab_display_${item.id}`}
                  />
                  <div className={`${styles.tab_dropdown}`}>
                    <PageDropdown
                      workspaceId={workspaceId}
                      pageReference={item.reference}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PageDropdown;
