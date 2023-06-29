import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";
import { useAppSelector } from "../../../app/hooks";
import { useWorkspaceData } from "../../../services/useWorkspaceData";
import { useDispatch } from "react-redux";
import { setWorkspace } from "../../../slice/workspaceSlice";
import { request } from "../../../lib/axios";
import { setUser } from "../../../slice/userSlice";
import EmojiSelector from "./EmojiSelector";
import { setPage } from "../../../slice/pageSlice";

interface WorkspaceDataType {
  workspaceId: string;
  workspaceName: string;
  workspaceIcon: string;
  favorites: any[];
}

const Settings = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const { mutate: mutateUpdateWorkspaceName } =
    useWorkspaceData.useUpdateWorkspaceNameData();
  const { mutate: mutateUpdateWorkspaceIcon } =
    useWorkspaceData.useUpdateWorkspaceIconData();
  const { mutate: mutateDeleteWorkspace } =
    useWorkspaceData.useDeleteWorkspaceData();
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [openPicker, setOpenPicker] = useState(false);
  const [emojiCode, setEmojiCode] = useState<string>("1f30e");
  const [emoji, setEmoji] = useState<string>(
    `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${workspaceInfo?.icon}.png`
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const workspaceId = workspaceInfo?.id;

    const workspaceData = {
      name: name!,
      workspaceId: workspaceId!,
    };

    mutateUpdateWorkspaceName(workspaceData, {
      onSuccess: async (data) => {
        if (data) {
          const updatedName = data.name;
          const userId = userInfo?.id;
          const user = await request({ url: `/users/${userId}` });

          const updatedWorkspace = {
            ...workspaceInfo!,
            name: updatedName,
          };

          dispatch(setWorkspace(updatedWorkspace));
          dispatch(setUser({ ...user.data }));

          const savedState = localStorage.getItem("workspaceListState");
          const parsedSavedState: WorkspaceDataType[] = JSON.parse(savedState!);

          for (let i = 0; i < parsedSavedState.length; i++) {
            if (parsedSavedState[i].workspaceId === workspaceId) {
              parsedSavedState[i].workspaceName = updatedName;
              break;
            }
          }

          localStorage.setItem(
            "workspaceListState",
            JSON.stringify(parsedSavedState)
          );
        }
      },
    });
  };

  const handleIconChange = () => {
    const workspaceId = workspaceInfo?.id;

    const workspaceData = {
      icon: emojiCode,
      workspaceId: workspaceId!,
    };

    mutateUpdateWorkspaceIcon(workspaceData, {
      onSuccess: async (data) => {
        if (data) {
          const updatedIcon = data.icon;
          const userId = userInfo?.id;
          const user = await request({ url: `/users/${userId}` });

          const updatedWorkspace = {
            ...workspaceInfo!,
            icon: updatedIcon,
          };

          dispatch(setWorkspace(updatedWorkspace));
          dispatch(setUser({ ...user.data }));

          const savedState = localStorage.getItem("workspaceListState");
          const parsedSavedState: WorkspaceDataType[] = JSON.parse(savedState!);

          for (let i = 0; i < parsedSavedState.length; i++) {
            if (parsedSavedState[i].workspaceId === workspaceId) {
              parsedSavedState[i].workspaceIcon = updatedIcon;
              break;
            }
          }

          localStorage.setItem(
            "workspaceListState",
            JSON.stringify(parsedSavedState)
          );
        }
      },
    });
  };

  const handleDelete = async () => {
    const workspaces = userInfo?.workspaces;
    const workspceData = { workspaceId: workspaceInfo?.id! };

    if (workspaces?.length! === 1) {
      window.alert("The last workspace cannot be deleted.");
      return;
    }

    const filteredWorkspaces = workspaces?.filter(
      (workspace) => workspace.workspaceId !== workspceData.workspaceId
    );

    if (filteredWorkspaces && filteredWorkspaces.length > 0) {
      const alternateWorkspaceId = filteredWorkspaces[0];
      const userId = userInfo?.id;

      mutateDeleteWorkspace(workspceData, {
        onSuccess: async () => {
          const workspace = await request({
            url: `/workspaces/${alternateWorkspaceId.workspaceId}`,
          });

          const pageId = workspace.data.pages[0].id;
          const page = await request({
            url: `/pages/${pageId}`,
          });

          dispatch(setPage({ ...page.data }));
          dispatch(setWorkspace({ ...workspace.data }));

          const user = await request({ url: `/users/${userId}` });

          dispatch(setUser({ ...user.data }));

          const savedState = localStorage.getItem("workspaceListState");
          const parsedSavedState: WorkspaceDataType[] = JSON.parse(savedState!);

          const updatedWorkspace = parsedSavedState.filter(
            (workspace) => workspace.workspaceId !== workspceData.workspaceId
          );

          localStorage.setItem(
            "workspaceListState",
            JSON.stringify(updatedWorkspace)
          );
        },
      });
    }
  };

  useEffect(() => {
    setName(workspaceInfo?.name || "");
  }, [workspaceInfo?.name]);

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f30e.png";
    e.currentTarget.onerror = null;
  };

  return (
    <>
      <div className={`${styles.panel} ${styles[theme]}`}>
        <div>
          <div className={`${styles.title}`}>Workspace settings</div>
          <div className={`${styles.body}`}>
            <div className={`${styles.container}`}>
              <div className={`${styles.change_name}`}>
                <p>Name</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <button type="submit">Change name</button>
                </form>
                <p>
                  You can use your organization or company name. Keep it simple.
                </p>
              </div>
            </div>
            <div className={`${styles.divider}`}></div>
            <br />
            <div className={`${styles.value_control}`}>
              <div className={`${styles.key}`}>
                <p>Icon</p>
                <div
                  className={`${styles.emoji_display}`}
                  onClick={() => setOpenPicker(true)}
                >
                  <img
                    src={emoji}
                    alt="emoji"
                    width={50}
                    onError={handleBrokenImage}
                  />
                </div>
                <p>
                  Upload an image or pick an emoji. It will show up in your
                  sidebar and notifications.
                </p>
              </div>
              <div className={`${styles.control} ${styles.valid_button}`}>
                <button onClick={handleIconChange}>Set Icon</button>
              </div>
            </div>
            <br />
            <div className={`${styles.divider}`}></div>
            <br />
            <br />
          </div>
        </div>
        <div>
          <div className={`${styles.title}`}>Public settings</div>
          <div className={`${styles.body}`}>
            <div className={`${styles.value_control}`}>
              <div className={`${styles.key}`}>
                <p>Domain</p>
                <p>
                  Pages shared to web will be under
                  endurable-part-ridge-afb.notion.site. Anyone with an allowed
                  email domain can join this workspace via
                  www.notion.so/endurable-part-ridge-afb.
                </p>
              </div>
            </div>
            <div className={`${styles.value_control}`}>
              <div className={`${styles.key}`}>
                <p>Danger zone</p>
                <p>Delete Entire Workspace</p>
              </div>
              <div className={`${styles.danger_button}`}>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmojiSelector
        openPicker={openPicker}
        closePicker={() => setOpenPicker(false)}
        setEmoji={setEmoji}
        setEmojiCode={setEmojiCode}
      />
    </>
  );
};

export default Settings;
