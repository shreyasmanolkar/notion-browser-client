import React, { useContext, useEffect, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as RightExpanIcon } from "../../assets/icons/right-expand.svg";
import { ReactComponent as PlusThickIcon } from "../../assets/icons/plus-thick.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";
import PageDropdown from "./PageDropdown";
import styles from "./privatePageList.module.scss";
import CreatePagePanel from "../create-Page-panel/CreatePagePanel";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setPage } from "../../slice/pageSlice";
import { checkSameIcons } from "../../utils/checkSameIcons";
import { PageType } from "../../common/types/Workspace";
import { checkSameTitles } from "../../utils/checkSameTitles";
import { NavLink } from "react-router-dom";
import { checkSameWorkspace } from "../../utils/checkSameWorkspace";

const PrivatePagesList = () => {
  const { theme } = useContext(ThemeContext);
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const dispatch = useDispatch();

  const initialPages = workspaceInfo?.pages;

  const rootPages = initialPages?.filter((page) => page.path === null);

  const [pagesMetaData, setPagesMetaData] = useState(rootPages);

  const pageId = pageInfo?.id;

  const [activePage, setActivePage] = useState(pageId);
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [parentPageId, setParentPageId] = useState("");

  const updatePageIcons = (
    array1: PageType[],
    array2: PageType[]
  ): PageType[] => {
    return array1.map((page1) => {
      const page2 = array2.find((page) => page.id === page1.id);
      if (page2 && page1.icon !== page2.icon) {
        return { ...page1, icon: page2.icon };
      }
      return page1;
    });
  };

  const updatePageTitles = (
    array1: PageType[],
    array2: PageType[]
  ): PageType[] => {
    return array1.map((page1) => {
      const page2 = array2.find((page) => page.id === page1.id);
      if (page2 && page1.title !== page2.title) {
        return { ...page1, title: page2.title };
      }
      return page1;
    });
  };

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  const handleAddPage = (id: string) => {
    setOpenCreatePage(true);
    setParentPageId(id);
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
    if (pagesMetaData?.length === 1 && rootPages?.length === 1) {
      if (pagesMetaData[0].id !== rootPages[0].id) {
        localStorage.setItem("pagesListState", JSON.stringify(rootPages));
        setPagesMetaData(rootPages);
      }
    } else if (pagesMetaData?.length === rootPages?.length) {
      const isIconEqual = checkSameIcons(pagesMetaData, rootPages);
      const isTitleEqual = checkSameTitles(pagesMetaData, rootPages);
      const isSameWorkspace = checkSameWorkspace(pagesMetaData, rootPages);

      if (!isSameWorkspace) {
        localStorage.setItem("pagesListState", JSON.stringify(rootPages));
        setPagesMetaData(rootPages);
      } else if (pagesMetaData !== rootPages) {
        if (isIconEqual) {
          localStorage.setItem("pagesListState", JSON.stringify(pagesMetaData));
        }

        if (isTitleEqual) {
          localStorage.setItem("pagesListState", JSON.stringify(pagesMetaData));
        }

        if (!isIconEqual) {
          const updatedPageList = updatePageIcons(pagesMetaData!, rootPages!);

          localStorage.setItem(
            "pagesListState",
            JSON.stringify(updatedPageList)
          );
          setPagesMetaData(updatedPageList);
        }

        if (!isTitleEqual) {
          const updatedPageList = updatePageTitles(pagesMetaData!, rootPages!);

          localStorage.setItem(
            "pagesListState",
            JSON.stringify(updatedPageList)
          );
          setPagesMetaData(updatedPageList);
        }
      }
    } else if (pagesMetaData?.length !== rootPages?.length) {
      localStorage.setItem("pagesListState", JSON.stringify(rootPages));
      setPagesMetaData(rootPages);
    }
  }, [pagesMetaData, rootPages]);

  useEffect(() => {
    const savedState = localStorage.getItem("pagesListState");

    if (savedState !== "undefined") {
      setPagesMetaData(JSON.parse(savedState!));
    }
  }, []);

  useEffect(() => {
    if (activePage !== rootPages![0].id) {
      localStorage.setItem("activePage", JSON.stringify(activePage));
    }
  }, [activePage, rootPages]);

  useEffect(() => {
    const savedState = localStorage.getItem("activePage");

    if (savedState !== "undefined") {
      setActivePage(JSON.parse(savedState!));
    }
  }, []);

  useEffect(() => {
    setActivePage(pageInfo?.id);
  }, [pageInfo]);

  return (
    <>
      <div className={`${styles.display_container} ${styles[theme]}`}>
        <div className={`${styles.title}`}>Private</div>
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
              <div className={`${styles.page_settings}`}>
                <div
                  className={`${styles.add_icon}`}
                  onClick={() => handleAddPage(item.id)}
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
                workspaceId={workspaceInfo?.id!}
                pageReference={item.reference}
                pageId={item.id}
              />
            </div>
          </div>
        ))}
      </div>
      <CreatePagePanel
        open={openCreatePage}
        onClose={() => setOpenCreatePage(false)}
        parentPageId={parentPageId}
      />
    </>
  );
};

export default PrivatePagesList;
