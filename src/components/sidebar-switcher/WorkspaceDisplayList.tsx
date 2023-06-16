import React, { useContext, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as DragHandleIcon } from "../../assets/icons/drag-handle.svg";
import styles from "./workspaceDisplayList.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

const WorkspaceDisplayList = () => {
  const { theme } = useContext(ThemeContext);
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);
  const [workspacesMetaData, setWorkspacesMetaData] = useState([
    {
      id: "1",
      name: "home-workspace",
      icon: "1f30e",
    },
    {
      id: "2",
      name: "office-workspace",
      icon: "1f5fc",
    },
  ]);

  const handleSort = () => {
    let _workspaceMetaData = [...workspacesMetaData];

    const dragItemContent = _workspaceMetaData.splice(dragItem.current, 1)[0];

    _workspaceMetaData.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setWorkspacesMetaData(_workspaceMetaData);
  };

  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  return (
    <div className={`${styles.display_container} ${styles[theme]}`}>
      {workspacesMetaData.map((item, index) => (
        <div
          key={index}
          className={`${styles.workspace_tab}`}
          draggable="true"
          onDragStart={(e) => (dragItem.current = index)}
          onDragEnter={(e) => (dragOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className={`${styles.workspace_info}`}>
            <div className={`${styles.drag_handle}`}>
              <DragHandleIcon />
            </div>
            <div className={`${styles.workspace_icon}`}>
              <img src={getEmojiUrl(item.icon!)} alt="" draggable="false" />
            </div>
            <div className={`${styles.workspace_title}`}>{item.name}</div>
          </div>
          {index === 0 ? (
            <div className={`${styles.workspace_check}`}>&#10003;</div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkspaceDisplayList;
