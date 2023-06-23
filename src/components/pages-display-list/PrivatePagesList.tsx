import React, { useContext, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as RightExpanIcon } from "../../assets/icons/right-expand.svg";
import { ReactComponent as PlusThickIcon } from "../../assets/icons/plus-thick.svg";
import styles from "./privatePageList.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";

const PrivatePagesList = () => {
  const { theme } = useContext(ThemeContext);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  const initialPages = workspaceInfo?.pages;
  const [pagesMetaData, setPagesMetaData] = useState(initialPages);

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  const handleExpand = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const currentRotation = e.currentTarget.style.transform;
    const currentRotationValue = parseInt(currentRotation.slice(7), 10);

    // console.log("e", e.currentTarget.parentNode?.parentNode);
    // console.log(
    //   "es ",
    //   e.currentTarget.parentNode?.parentNode?.nextSibling?.nextSibling
    // );

    // const element =
    //   e.currentTarget.parentNode?.parentNode?.nextSibling?.nextSibling;

    if (currentRotationValue === 90) {
      e.currentTarget.style.transform = "rotate(0deg)";
    } else {
      e.currentTarget.style.transform = "rotate(90deg)";
    }
  };

  const handleAddPage = () => {
    console.log("add page");
  };

  return (
    <>
      <div className={`${styles.display_container} ${styles[theme]}`}>
        <div className={`${styles.title}`}>Private</div>
        {/* map here  */}
        {pagesMetaData?.map((item, index) => (
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
              <div className={`${styles.page_title}`}>{item.reference}</div>
              <div className={`${styles.page_settings}`}>
                <div className={`${styles.add_icon}`} onClick={handleAddPage}>
                  <PlusThickIcon />
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              className={`${styles.toggle_checkbox}`}
              id={`page_tab_display_${item.id}`}
            />
            <div className={`${styles.tab_dropdown}`}></div>
          </div>
        ))}
        {/* end for map */}
        {/* end */}
      </div>
    </>
  );
};

export default PrivatePagesList;
