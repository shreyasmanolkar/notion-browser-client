import { MouseEvent, useState } from "react";
import styles from "./workspace.module.scss";
import LeftSidebar from "../../layouts/left-sidebar";
import PageDisplay from "../../layouts/page-display";
import RightSidebar from "../../layouts/right-sidebar";

const Workspace = () => {
  const [leftOpen, setLeftOpen] = useState<boolean>(true);
  const [rightOpen, setRightOpen] = useState<boolean>(false);
  const [rightPanelContent, setRightPanelContent] = useState<string | null>(
    null
  );

  const toggleSidebar = (event: MouseEvent) => {
    const targetId = event.currentTarget.id;
    const parentNode = event.currentTarget.parentNode as HTMLElement;

    if (parentNode) {
      const key = `${parentNode.id}_open`;

      if (key === "left_header_open" || key === "menu_icon_open") {
        setLeftOpen(!leftOpen);
      } else if (key === "right_header_open" || key === "options_open") {
        if (targetId === "history") {
          !rightOpen && setRightOpen(true);

          setRightPanelContent("history");
        } else if (targetId === "comment") {
          !rightOpen && setRightOpen(true);

          setRightPanelContent("comment");
        } else {
          setRightOpen(false);
        }
      }
    }
  };

  return (
    <div className={`${styles.layout}`}>
      <LeftSidebar leftOpen={leftOpen} toggleSidebar={toggleSidebar} />

      <PageDisplay leftOpen={leftOpen} toggleSidebar={toggleSidebar} />

      <RightSidebar
        rightOpen={rightOpen}
        toggleSidebar={toggleSidebar}
        rightPanelContent={rightPanelContent}
      />
    </div>
  );
};

export default Workspace;
