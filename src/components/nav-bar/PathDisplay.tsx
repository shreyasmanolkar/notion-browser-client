import React, { useContext } from "react";
import { useAppSelector } from "../../app/hooks";
import twemoji from "twemoji";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as FilledLock } from "../../assets/icons/filled-lock.svg";
import styles from "./pathDisplay.module.scss";
import { request } from "../../lib/axios";
import { setPage } from "../../slice/pageSlice";
import { useDispatch } from "react-redux";

type PathDisplayProps = {
  id: string;
};

const PathDisplay: React.FC<PathDisplayProps> = ({ id }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );

  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  const handlePathTabClick = async (id: string) => {
    const page = await request({
      url: `/pages/${id}`,
    });

    dispatch(setPage({ ...page.data }));
  };

  const handlePathDisplay = (id: string) => {
    const pagePaths = [];

    const pages = workspaceInfo?.pages;

    let currentPage = pages?.find((page) => page.id === id);

    if (currentPage) {
      const pagePath = {
        id: currentPage.id,
        title: currentPage.title,
        icon: currentPage.icon,
      };

      pagePaths.unshift(pagePath);
    }

    while (currentPage && currentPage.path !== null) {
      const parentPageReference: string | undefined = currentPage.path!;

      if (parentPageReference) {
        const parentPage = pages!.find(
          (page) =>
            page.reference ===
            parentPageReference.slice(1, parentPageReference!.length - 1)
        );

        if (parentPage) {
          const pagePath = {
            id: parentPage.id,
            title: parentPage.title,
            icon: parentPage.icon,
          };

          pagePaths.unshift(pagePath);
          currentPage = parentPage;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return pagePaths;
  };

  return (
    <>
      <div className={`${styles.path_container} ${styles[theme]}`}>
        {handlePathDisplay(id).map((page) => (
          <React.Fragment key={page.id}>
            <div
              className={`${styles.path_tab}`}
              onClick={() => handlePathTabClick(page.id)}
            >
              <div className={`${styles.emoji}`}>
                <img
                  src={getEmojiUrl(page.icon)}
                  onError={(e) => handleBrokenImage(e)}
                  alt="dp"
                  draggable="false"
                />
              </div>
              {page.title}
            </div>
            <div className={`${styles.separator}`}>/</div>
          </React.Fragment>
        ))}
      </div>
      {pageInfo?.pageSettings.lock ? (
        <div className={`${styles.lock}`}>
          <div className={`${styles.icon}`}>
            <FilledLock />
          </div>
          Locked
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PathDisplay;
