import React, { useContext, useEffect, useState } from "react";
import twemoji from "twemoji";
import { ReactComponent as DragHandleIcon } from "../../assets/icons/drag-handle.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { setWorkspace } from "../../slice/workspaceSlice";
import { request } from "../../lib/axios";
import { setPage } from "../../slice/pageSlice";
import styles from "./workspaceDisplayList.module.scss";
import { useWorkspaceData } from "../../services/useWorkspaceData";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slice/userSlice";

type WorkspaceDisplayListProps = {
  onClose: () => void;
};

const WorkspaceDisplayList: React.FC<WorkspaceDisplayListProps> = ({
  onClose,
}) => {
  const { theme } = useContext(ThemeContext);
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const { mutate: mutateUpdateWorkspacePages } =
    useWorkspaceData.useUpdateWorkspacePagesData();

  const initialWorkspaces = userInfo?.workspaces;

  const [workspacesMetaData, setWorkspacesMetaData] =
    useState(initialWorkspaces);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSort = () => {
    let _workspaceMetaData = [...workspacesMetaData!];

    const dragItemContent = _workspaceMetaData.splice(dragItem.current, 1)[0];

    _workspaceMetaData.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setWorkspacesMetaData(_workspaceMetaData);
  };

  const handleOnClick = async (workspaceId: string) => {
    const initialPages = workspaceInfo?.pages;

    const branchPages = initialPages?.filter((page) => page.path !== null);
    const savedState = localStorage.getItem("pagesListState");
    const parsedRootPages = JSON.parse(savedState!);

    const workspaceData = {
      workspaceId: workspaceInfo?.id!,
      pages: [...parsedRootPages!, ...branchPages!],
    };

    mutateUpdateWorkspacePages(workspaceData, {
      onSuccess: async (data) => {
        if (data) {
          onClose();
          const userId = userInfo?.id;
          const user = await request({ url: `/users/${userId}` });
          const workspace = await request({
            url: `/workspaces/${workspaceId}`,
          });

          const pageId = workspace.data.pages[0].id;
          const page = await request({
            url: `/pages/${pageId}`,
          });

          dispatch(setUser({ ...user.data }));
          dispatch(setWorkspace({ ...workspace.data }));
          dispatch(setPage({ ...page.data }));

          navigate(`/${page.data.reference}`);
        }
      },
    });
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
    } else if (workspacesMetaData?.length !== initialWorkspaces?.length) {
      localStorage.setItem(
        "workspaceListState",
        JSON.stringify(initialWorkspaces)
      );
      setWorkspacesMetaData(initialWorkspaces);
    }
  }, [workspacesMetaData, initialWorkspaces]);

  useEffect(() => {
    const savedState = localStorage.getItem("workspaceListState");

    if (savedState !== "undefined") {
      setWorkspacesMetaData(JSON.parse(savedState!));
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
          onClick={() => handleOnClick(item.workspaceId)}
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
