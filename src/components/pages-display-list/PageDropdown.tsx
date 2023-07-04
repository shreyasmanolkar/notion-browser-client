import React, { useContext, useEffect, useState } from "react";
import { useWorkspaceData } from "../../services/useWorkspaceData";
import styles from "./pageDropdown.module.scss";
import { PageType } from "../../slice/workspaceSlice";
import { ReactComponent as RightExpanIcon } from "../../assets/icons/right-expand.svg";
import { ReactComponent as PlusThickIcon } from "../../assets/icons/plus-thick.svg";
import twemoji from "twemoji";
import { ThemeContext } from "../../context/ThemeContext";
import CreatePagePanel from "../create-Page-panel/CreatePagePanel";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setPage } from "../../slice/pageSlice";
import { useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router-dom";

type PageDropdownProps = {
  workspaceId: string;
  pageReference: string;
  pageId: string;
};

const PageDropdown: React.FC<PageDropdownProps> = ({
  workspaceId,
  pageReference,
  pageId,
}) => {
  const { theme } = useContext(ThemeContext);
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [parentPageId, setParentPageId] = useState("");
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const [activePage, setActivePage] = useState(pageId);
  const { data: childPagesOrNull, isLoading } =
    useWorkspaceData.useFetchChildPagesByworkspaceIdAndPageReference(
      workspaceId,
      pageReference,
      pageId
    );
  const dispatch = useDispatch();

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  const handleExpand = (e: React.SyntheticEvent<HTMLDivElement>) => {};

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

  const handleOnPageTabClick = async (id: string) => {
    const page = await request({
      url: `/pages/${id}`,
    });

    dispatch(setPage({ ...page.data }));
  };

  useEffect(() => {
    setActivePage(pageInfo?.id!);
  }, [pageInfo]);

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
                <div
                  className={`${styles.page_tab} ${
                    activePage === `${item.id}` ? styles.active : ""
                  }`}
                  key={index}
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
                    <NavLink
                      to={`${item.reference}`}
                      className={`${styles.nav_link}`}
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
                      workspaceId={workspaceId}
                      pageReference={item.reference}
                      pageId={item.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <CreatePagePanel
        open={openCreatePage}
        onClose={() => setOpenCreatePage(false)}
        parentPageId={parentPageId}
      />
    </>
  );
};

export default PageDropdown;
