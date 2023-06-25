import React, { useContext, useEffect, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as RightExpanIcon } from "../../assets/icons/right-expand.svg";
import { ReactComponent as PlusThickIcon } from "../../assets/icons/plus-thick.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";
import PageDropdown from "./PageDropdown";
import { PageType } from "../../common/types/Workspace";
import styles from "./privatePageList.module.scss";

const FavoritePagesList = () => {
  const { theme } = useContext(ThemeContext);
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const userWorkspace = userInfo?.workspaces.find(
    (workspace) => workspace.workspaceId === workspaceInfo?.id
  );

  const favoriteIds = userWorkspace?.favorites;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favoritePages: PageType[] = [];

  // eslint-disable-next-line array-callback-return
  favoriteIds?.map((id) => {
    const FavoritePage = workspaceInfo?.pages.find((page) => page.id === id);
    favoritePages.push(FavoritePage!);
  });

  const [pagesMetaData, setPagesMetaData] = useState(favoritePages);

  const [activePage, setActivePage] = useState<string>();

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

  const handleSort = () => {
    let _pagesMetaData = [...pagesMetaData!];

    const dragItemContent = _pagesMetaData.splice(dragItem.current, 1)[0];

    _pagesMetaData.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setPagesMetaData(_pagesMetaData);
  };

  const handleOnPageTabClick = (id: string) => {
    setActivePage(id);
  };

  useEffect(() => {
    if (pagesMetaData?.length === favoritePages?.length) {
      if (pagesMetaData !== favoritePages) {
        localStorage.setItem(
          "favoritePagesListState",
          JSON.stringify(pagesMetaData)
        );
      }
    } else if (pagesMetaData?.length !== favoritePages?.length) {
      localStorage.setItem(
        "favoritePagesListState",
        JSON.stringify(favoritePages)
      );
      setPagesMetaData(favoritePages);
    }
  }, [pagesMetaData, favoritePages]);

  useEffect(() => {
    const savedState = localStorage.getItem("favoritePagesListState");

    if (savedState !== "undefined") {
      setPagesMetaData(JSON.parse(savedState!));
    }
  }, []);

  useEffect(() => {
    if (activePage !== favoritePages![0].id) {
      localStorage.setItem("activePage", JSON.stringify(activePage));
    }
  }, [activePage, favoritePages]);

  useEffect(() => {
    const savedState = localStorage.getItem("activePage");

    if (savedState !== "undefined") {
      setActivePage(JSON.parse(savedState!));
    }
  }, []);

  return (
    <>
      <div className={`${styles.display_container} ${styles[theme]}`}>
        <div className={`${styles.title}`}>Favorites</div>
        {pagesMetaData?.map((item, index) => (
          <div
            className={`${styles.page_tab} ${
              activePage === `${item.id}` ? styles.active : ""
            }`}
            key={index}
            draggable="true"
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
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
              <div
                className={`${styles.page_title}`}
                onClick={() => handleOnPageTabClick(item.id)}
              >
                {item.title}
              </div>
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
            <div className={`${styles.tab_dropdown}`}>
              <PageDropdown
                workspaceId={workspaceInfo?.id!}
                pageReference={item.reference}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoritePagesList;