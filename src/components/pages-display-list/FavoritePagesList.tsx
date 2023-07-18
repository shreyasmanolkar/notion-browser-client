import React, { useContext, useEffect, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as RightExpanIcon } from "../../assets/icons/right-expand.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";
import PageDropdown from "./PageDropdown";
import { PageType } from "../../common/types/Workspace";
import styles from "./privatePageList.module.scss";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setPage } from "../../slice/pageSlice";
import { NavLink } from "react-router-dom";
import { checkSameWorkspace } from "../../utils/checkSameWorkspace";

const FavoritePagesList = () => {
  const { theme } = useContext(ThemeContext);
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);

  const userWorkspace = userInfo?.workspaces.find(
    (workspace) => workspace.workspaceId === workspaceInfo?.id
  );

  const [favoriteIds, setFavoriteIds] = useState<string[] | []>(
    userWorkspace?.favorites!
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favoritePages: PageType[] = [];
  // const [favoritePages, setFavoritePages] = useState<PageType[]>([]);

  // eslint-disable-next-line array-callback-return
  favoriteIds?.map((id) => {
    const favoritePage = workspaceInfo?.pages.find((page) => page.id === id);
    favoritePages.push(favoritePage!);
    // setFavoritePages((pages) => [...pages, favoritePage!]);
  });
  const [pagesMetaData, setPagesMetaData] = useState(favoritePages);

  const pageId = pageInfo?.id;
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(pageId);

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
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

  const handleOnPageTabClick = async (id: string) => {
    setActivePage(id);

    const page = await request({
      url: `/pages/${id}`,
    });

    dispatch(setPage({ ...page.data }));
  };

  useEffect(() => {
    if (pagesMetaData?.length === favoritePages?.length) {
      if (favoritePages[0] !== undefined) {
        const isSameWorkspace = checkSameWorkspace(
          pagesMetaData,
          favoritePages
        );

        if (!isSameWorkspace) {
          localStorage.setItem("pagesListState", JSON.stringify(favoritePages));
          setPagesMetaData(favoritePages);
        } else if (pagesMetaData !== favoritePages) {
          localStorage.setItem(
            "favoritePagesListState",
            JSON.stringify(pagesMetaData)
          );
        }
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
      const parsedState = JSON.parse(savedState!);

      if (parsedState?.length! > 0) {
        setPagesMetaData(JSON.parse(savedState!));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activePage", JSON.stringify(activePage));
  }, [activePage]);

  useEffect(() => {
    const savedState = localStorage.getItem("activePage");

    if (savedState !== "undefined") {
      setActivePage(JSON.parse(savedState!));
    }
  }, []);

  useEffect(() => {
    setActivePage(pageInfo?.id);
  }, [pageInfo]);

  useEffect(() => {
    const userWorkspace = userInfo?.workspaces.find(
      (workspace) => workspace.workspaceId === workspaceInfo?.id
    );

    setFavoriteIds(userWorkspace?.favorites!);
  }, [userInfo?.workspaces, workspaceInfo?.id]);

  return (
    <>
      <div className={`${styles.display_container} ${styles[theme]}`}>
        <div className={`${styles.title}`}>Favorites</div>
        {pagesMetaData?.map((item, index) => (
          <div
            className={`${styles.page_tab} 
            ${activePage === `${item.id}` ? styles.active : ""}
            `}
            key={index}
            draggable="true"
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className={`${styles.page_info}`}>
              <label
                htmlFor={`page_tab_display_${item.id}_fav`}
                className={`${styles.dropdown}`}
              >
                <div className={`${styles.collapse_handle}`}>
                  <RightExpanIcon />
                </div>
              </label>
              <NavLink
                to={`${item.reference}`}
                className={`${styles.nav_link}`}
                onClick={() => handleOnPageTabClick(item.id)}
              >
                <div
                  className={`${styles.page_emoji}`}
                  onClick={() => handleOnPageTabClick(item.id)}
                >
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
              </NavLink>
              <div className={`${styles.page_settings}`}></div>
            </div>
            <input
              type="checkbox"
              className={`${styles.toggle_checkbox_fav}`}
              id={`page_tab_display_${item.id}_fav`}
            />
            <div className={`${styles.tab_dropdown_fav}`}>
              <PageDropdown
                workspaceId={workspaceInfo?.id!}
                pageReference={item.reference}
                pageId={item.id}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoritePagesList;
