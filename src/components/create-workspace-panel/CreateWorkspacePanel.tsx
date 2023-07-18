import React, { useContext, useEffect, useState } from "react";
import styles from "./createWorkspacePanel.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { Validate, validateCreateWorkspaceProps } from "../../utils/validate";
import EmojiSelector from "./EmojiSelector";
import { useUserData } from "../../services/useUserData";
import { useAppSelector } from "../../app/hooks";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";
import { setWorkspace } from "../../slice/workspaceSlice";
import { setPage } from "../../slice/pageSlice";
import { useWorkspaceData } from "../../services/useWorkspaceData";
import { useNavigate } from "react-router-dom";

type CreateWorkspacePanelProps = {
  createWorkspaceOnClose: () => void;
  headerOnClose: () => void;
  onCloseSwitcherDropDown: () => void;
};

const CreateWorkspacePanel: React.FC<CreateWorkspacePanelProps> = ({
  createWorkspaceOnClose,
  headerOnClose,
  onCloseSwitcherDropDown,
}) => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [emojiCode, setEmojiCode] = useState<string>("1f30e");
  const [openPicker, setOpenPicker] = useState(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<
    Partial<validateCreateWorkspaceProps>
  >({});
  const { mutate } = useUserData.useCreateWorkspaceData();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const { mutate: mutateUpdateWorkspacePages } =
    useWorkspaceData.useUpdateWorkspacePagesData();
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleCreateWorkspace();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmit]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setFormErrors(Validate.validateCreateWorkspace({ name }));
    setIsSubmit(true);
  };

  const handleCreateWorkspace = () => {
    const icon = emojiCode;

    const createWorkspaceData = {
      name,
      icon,
    };

    const initialPages = workspaceInfo?.pages;

    const branchPages = initialPages?.filter((page) => page.path !== null);
    const savedState = localStorage.getItem("pagesListState");
    const parsedRootPages = JSON.parse(savedState!);

    const workspaceData = {
      workspaceId: workspaceInfo?.id!,
      pages: [...parsedRootPages!, ...branchPages!],
    };

    mutateUpdateWorkspacePages(workspaceData);

    mutate(createWorkspaceData, {
      onSuccess: async (data) => {
        if (data) {
          const userId = userInfo?.id;
          const { workspaceId } = data;

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

          setName("");
          createWorkspaceOnClose();
          headerOnClose();
          onCloseSwitcherDropDown();
        }
      },
    });
  };

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f30e.png";
    e.currentTarget.onerror = null;
  };

  return (
    <>
      <div className={`${styles.create_workspace_panel} ${styles[theme]}`}>
        <h1>Create a workspace</h1>
        <p>Fill in some details for your teammates.</p>
        <div
          data-testid="emoji"
          className={`${styles.emoji_display}`}
          onClick={() => setOpenPicker(true)}
        >
          <img src={emoji} alt="emoji" width={50} onError={handleBrokenImage} />
        </div>
        <p>Choose icon</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Workspace name</label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="The name of your workspace."
            onChange={handleNameChange}
          />
          {formErrors.name && (
            <p className={`${styles.error}`}>{formErrors.name}</p>
          )}

          <button type="submit">Continue</button>
          <br />
        </form>
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

export default CreateWorkspacePanel;
