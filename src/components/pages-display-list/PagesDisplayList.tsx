import React, { useContext } from "react";
import PrivatePagesList from "./PrivatePagesList";
import styles from "./pagesDisplayList.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import FavoritePagesList from "./FavoritePagesList";
import { useAppSelector } from "../../app/hooks";

const PagesDisplayList = () => {
  const { theme } = useContext(ThemeContext);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const userWorkspace = userInfo?.workspaces.find(
    (workspace) => workspace.workspaceId === workspaceInfo?.id
  );

  const favoriteIds = userWorkspace?.favorites;

  return (
    <div className={`${styles.sidebar_body} ${styles[theme]}`}>
      {favoriteIds?.length! > 0 ? <FavoritePagesList /> : null}
      <PrivatePagesList />
    </div>
  );
};

export default PagesDisplayList;
