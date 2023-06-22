import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./account.module.scss";
import { useAppSelector } from "../../../app/hooks";
import { useWorkspaceData } from "../../../services/useWorkspaceData";
import { useDispatch } from "react-redux";
import { setWorkspace } from "../../../slice/workspaceSlice";
import { request } from "../../../lib/axios";
import { setUser } from "../../../slice/userSlice";
import Workspace from "../../../pages/workspace";

interface Workspace {
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
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

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
          const parsedSavedState: Workspace[] = JSON.parse(savedState!);

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

  useEffect(() => {
    setName(workspaceInfo?.name || "");
  }, [workspaceInfo?.name]);

  return (
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
              {/* Update Icon here */}
              <p>
                Upload an image or pick an emoji. It will show up in your
                sidebar and notifications.
              </p>
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
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
