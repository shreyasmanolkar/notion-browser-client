import React, { useContext } from "react";
import styles from "./sortPanel.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

type SortPanelProps = {
  open: boolean;
  onClose: () => void;
  setSortOption: (sortOption: string) => void;
};

const SortPanel: React.FC<SortPanelProps> = ({
  open,
  onClose,
  setSortOption,
}) => {
  const { theme } = useContext(ThemeContext);

  if (!open) return null;

  return (
    <div
      className={`${styles.sort_panel_background} ${styles[theme]}`}
      onClick={onClose}
    >
      <div
        className={`${styles.sort_panel}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={`${styles.tab}`}
          onClick={() => {
            setSortOption("Best matches");
            onClose();
          }}
        >
          Best matches
        </div>
        <div
          className={`${styles.tab}`}
          onClick={() => {
            setSortOption("Created: Newest first");
            onClose();
          }}
        >
          Created: Newest first
        </div>
        <div
          className={`${styles.tab}`}
          onClick={() => {
            setSortOption("Created: Oldest first");
            onClose();
          }}
        >
          Created: Oldest first
        </div>
      </div>
    </div>
  );
};

export default SortPanel;
