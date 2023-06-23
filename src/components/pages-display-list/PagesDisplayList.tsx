import React, { useContext } from "react";
import PrivatePagesList from "./PrivatePagesList";
import styles from "./pagesDisplayList.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

const PagesDisplayList = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.sidebar_body} ${styles[theme]}`}>
      <PrivatePagesList />
    </div>
  );
};

export default PagesDisplayList;
