import React, { useContext, useEffect, useState } from "react";
import { SidebarLogicContext } from "../../context/SidebarContext";
import styles from "./navbar.module.scss";
import { useAppSelector } from "../../app/hooks";
import getFormattedTimeDifference from "../../utils/getFormatedTimeDifference";
import moment from "moment";
import { ReactComponent as TopUpdateIcon } from "../../assets/icons/top-update.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as StarOutlineIcon } from "../../assets/icons/star-outline.svg";
import { ReactComponent as FillStarIcon } from "../../assets/icons/fill-star.svg";
import { ReactComponent as TopDotsIcon } from "../../assets/icons/top-dots.svg";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const { leftOpen, toggleSidebar } = useContext(SidebarLogicContext);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const [currentTime, setCurrentTime] = useState(moment());
  const [favorite, setFavorite] = useState(false);

  const handleStarClick = () => {
    setFavorite(!favorite);
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

    console.log("pp", JSON.stringify(pagePaths, null, 2));
    // return pagePaths;
    return "ok";
  };

  const formatedTime = (createdAt: Date) => {
    const time = getFormattedTimeDifference(createdAt, currentTime);
    return time;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.header} ${styles[theme]}`}>
      <div id="menu_icon" className={`${styles.path}`} data-testid="menu-icon">
        {!leftOpen && (
          <div className={`${styles.on_menu_icon}`} onClick={toggleSidebar}>
            &equiv;
          </div>
        )}
        {pageInfo ? <h3>{pageInfo.title}</h3> : <h3>Page Title</h3>}
        {handlePathDisplay(pageInfo?.id!)}
        {/* {console.log(handlePathDisplay(pageInfo?.id!))} */}
      </div>
      <div id="options" className={`${styles.main_options}`}>
        <div className={`${styles.edited_at}`}>
          <p>
            Edited{" "}
            {pageInfo?.updatedAt
              ? formatedTime(pageInfo.updatedAt)
              : formatedTime(pageInfo?.createdAt!)}
          </p>
        </div>
        <div className={`${styles.share}`}>
          <p>Share</p>
        </div>
        <div
          id="comment"
          className={`${styles.comments}`}
          onClick={toggleSidebar}
        >
          <div className={`${styles.icon}`}>
            <CommentIcon />
          </div>
        </div>
        <div
          id="history"
          className={`${styles.history}`}
          onClick={toggleSidebar}
        >
          <div className={`${styles.icon}`}>
            <TopUpdateIcon />
          </div>
        </div>
        <div className={`${styles.icon}`} onClick={handleStarClick}>
          {favorite ? <FillStarIcon /> : <StarOutlineIcon />}
        </div>
        <div className={`${styles.icon}`}>
          {/* TODO: add page options */}
          <TopDotsIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
