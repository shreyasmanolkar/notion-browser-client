import React, { useContext, useEffect, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as DragHandleIcon } from "../../assets/icons/drag-handle.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { setWorkspace } from "../../slice/workspaceSlice";
import { request } from "../../lib/axios";
import styles from "./workspaceDisplayList.module.scss";

const WorkspaceDisplayList = () => {
  const { theme } = useContext(ThemeContext);
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );

  const initialWorkspaces = userInfo?.workspaces;

  const [workspacesMetaData, setWorkspacesMetaData] =
    useState(initialWorkspaces);
  const dispatch = useDispatch();

  const handleSort = () => {
    let _workspaceMetaData = [...workspacesMetaData!];

    const dragItemContent = _workspaceMetaData.splice(dragItem.current, 1)[0];

    _workspaceMetaData.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setWorkspacesMetaData(_workspaceMetaData);
  };

  const handleOnClick = async (workspaceId: string) => {
    const workspace = await request({
      url: `/workspaces/${workspaceId}`,
    });

    dispatch(setWorkspace({ ...workspace.data }));
  };

  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  useEffect(() => {
    if (workspacesMetaData?.length === initialWorkspaces?.length) {
      if (workspacesMetaData !== initialWorkspaces) {
        localStorage.setItem(
          "workspaceListState",
          JSON.stringify(workspacesMetaData)
        );
      }
    } else {
      localStorage.setItem(
        "workspaceListState",
        JSON.stringify(initialWorkspaces)
      );
      setWorkspacesMetaData(initialWorkspaces);
    }
  }, [workspacesMetaData, initialWorkspaces]);

  useEffect(() => {
    const savedState = localStorage.getItem("workspaceListState");

    if (savedState) {
      setWorkspacesMetaData(JSON.parse(savedState));
    }
  }, []);

  return (
    <div className={`${styles.display_container} ${styles[theme]}`}>
      {workspacesMetaData?.map((item, index) => (
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
              <img
                src={getEmojiUrl(item.workspaceIcon!)}
                onError={(e) => handleBrokenImage(e)}
                alt=""
                draggable="false"
              />
            </div>
            <div
              className={`${styles.workspace_title}`}
              onClick={() => handleOnClick(item.workspaceId)}
            >
              {item.workspaceName}
            </div>
          </div>
          {workspaceInfo?.id === item.workspaceId ? (
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
