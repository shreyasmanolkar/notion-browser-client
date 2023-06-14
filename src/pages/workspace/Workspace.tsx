import { MouseEvent, useState } from "react";
import styles from "./workspace.module.scss";

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
      {/* left sidebar */}

      <div
        id="left"
        className={`${styles.left} ${
          leftOpen ? styles.left_open : styles.left_closed
        }`}
      >
        <div className={`${styles.sidebar} ${leftOpen ? "open" : "closed"}`}>
          <div id="left_header" className={`${styles.header}`}>
            <div className={`${styles.title_container}`}>
              <p>Workspace</p>
            </div>
            <div className={`${styles.icon}`} onClick={toggleSidebar}>
              &#171;
            </div>
          </div>
          <div className={`${styles.content}`}></div>
        </div>
      </div>

      {/* main */}

      <div className={`${styles.main}`}>
        <div className={`${styles.header}`}>
          <div id="menu_icon" className={`${styles.path}`}>
            <div className={`${styles.on_menu_icon}`} onClick={toggleSidebar}>
              &equiv;
            </div>
            <h3>Page Title</h3>
          </div>
          <div id="options" className={`${styles.main_options}`}>
            <p>Edited At</p>
            <p>Share</p>
            <div
              id="history"
              className={`${styles.history}`}
              onClick={toggleSidebar}
            >
              &#9830;
            </div>
            <p>History</p>
            <div
              id="comment"
              className={`${styles.comments}`}
              onClick={toggleSidebar}
            >
              &#9733;
            </div>
            <p>options</p>
          </div>
        </div>
        <div className={`${styles.content}`}>
          <div className={`${styles.cover}`}></div>
          <div className={`${styles.page_content}`}></div>
        </div>
      </div>

      {/* right sidebar */}

      <div
        id="right"
        className={`${styles.right} ${
          rightOpen ? styles.right_open : styles.right_closed
        }`}
      >
        <div className={`${styles.sidebar} ${rightOpen ? "open" : "closed"}`}>
          <div id="right_header" className={`${styles.header}`}>
            <div className={`${styles.icon}`} onClick={toggleSidebar}>
              &#187;
            </div>
          </div>
          <div className={`${styles.content}`}>
            {rightPanelContent === "comment" ? <p>Comment</p> : <p>History</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
