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
    if (pagesMetaData?.length === rootPages?.length) {
      if (pagesMetaData !== rootPages) {
        localStorage.setItem("pagesListState", JSON.stringify(pagesMetaData));
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
