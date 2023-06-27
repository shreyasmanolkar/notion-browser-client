import React from "react";
import styles from "./search.module.scss";

type SearchPanelProps = {
  open: boolean;
  onClose: () => void;
};

const SearchPanel: React.FC<SearchPanelProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className={`${styles.search_panel_background}`} onClick={onClose}>
        <div
          className={`${styles.search_panel}`}
          onClick={(e) => e.stopPropagation()}
        >
          search
        </div>
      </div>
    </>
  );
};

export default SearchPanel;
