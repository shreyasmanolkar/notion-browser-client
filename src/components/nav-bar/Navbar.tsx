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
import PathDisplay from "./PathDisplay";
import PageOptions from "./PageOptions";
import { usePageData } from "../../services/usePageData";
import { useDispatch } from "react-redux";
import { PageType } from "../../common/types/Page";
import { setPage } from "../../slice/pageSlice";
import { setUser } from "../../slice/userSlice";
import { request } from "../../lib/axios";

type FavoritePageType = {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
  title: string;
  createdAt: Date;
};

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const { leftOpen, toggleSidebar } = useContext(SidebarLogicContext);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [currentTime, setCurrentTime] = useState(moment());
  const isFavorite = pageInfo?.favorite.includes(userInfo!.id);
  const [favorite, setFavorite] = useState(isFavorite);
  const [openPageOptions, setOpenPageOptions] = useState<boolean>(false);
  const { mutate: mutateAddToFavorites } = usePageData.useAddToFavorites();
  const { mutate: mutateRemoveFromFavorites } =
    usePageData.useRemoveFromFavorites();
  const dispatch = useDispatch();

  const handleStarClick = () => {
    setFavorite(!favorite);
  };

  const formatedTime = (createdAt: Date) => {
    const time = getFormattedTimeDifference(createdAt, currentTime);
    return time;
  };

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    const pageData = {
      pageId: pageInfo?.id!,
    };

    if (favorite) {
      mutateAddToFavorites(pageData, {
        onSuccess: async () => {
          const updatedPage: PageType = {
            ...pageInfo!,
            favorite: [...pageInfo!.favorite, userInfo!.id],
          };

          const user = await request({ url: `/users/${userInfo?.id}` });

          dispatch(setPage(updatedPage));
          dispatch(setUser({ ...user.data }));
        },
      });
    } else {
      mutateRemoveFromFavorites(pageData, {
        onSuccess: async () => {
          const updatedPage: PageType = {
            ...pageInfo!,
            favorite: pageInfo!.favorite.filter(
              (userId) => userId !== userInfo?.id
            ),
          };

          const user = await request({ url: `/users/${userInfo?.id}` });

          dispatch(setPage(updatedPage));
          dispatch(setUser({ ...user.data }));

          const savedState = localStorage.getItem("favoritePagesListState");
          const parsedSavedState: FavoritePageType[] =
            savedState === undefined ? JSON.parse(savedState!) : [];

          const updatedSavedState =
            parsedSavedState &&
            parsedSavedState.filter((page) => page.id !== pageInfo?.id);

          if (updatedSavedState && updatedSavedState.length === 0) {
            localStorage.setItem("favoritePagesListState", JSON.stringify([]));
          } else {
            localStorage.setItem(
              "favoritePagesListState",
              JSON.stringify(updatedSavedState)
            );
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorite]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={`${styles.header} ${styles[theme]}`}>
        <div
          id="menu_icon"
          className={`${styles.path}`}
          data-testid="menu-icon"
        >
          {!leftOpen && (
            <div className={`${styles.on_menu_icon}`} onClick={toggleSidebar}>
              &equiv;
            </div>
          )}
          <PathDisplay id={pageInfo?.id!} />
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
          <div
            className={`${styles.icon}`}
            onClick={() => {
              setOpenPageOptions(!openPageOptions);
            }}
          >
            <TopDotsIcon />
          </div>
        </div>
      </div>
      <PageOptions
        open={openPageOptions}
        onClose={() => setOpenPageOptions(false)}
        favorite={favorite!}
        onFavoriteClick={() => setFavorite(!favorite)}
      />
    </>
  );
};

export default Navbar;
