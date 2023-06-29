import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as OpenPageIcon } from "../../assets/icons/open-page.svg";
import { ReactComponent as PeekModeIcon } from "../../assets/icons/peek-mode.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as TopUpdateIcon } from "../../assets/icons/top-update.svg";
import { ReactComponent as StarOutlineIcon } from "../../assets/icons/star-outline.svg";
import { ReactComponent as FillStarIcon } from "../../assets/icons/fill-star.svg";
import { ReactComponent as TopDotsIcon } from "../../assets/icons/top-dots.svg";
import { ReactComponent as AddIconIcon } from "../../assets/icons/add-icon.svg";
import { ReactComponent as AddCoverIcon } from "../../assets/icons/add-cover.svg";
import { useAppSelector } from "../../app/hooks";
import EmojiSelector from "./EmojiSelector";
import twemoji from "twemoji";
import { usePageData } from "../../services/usePageData";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setWorkspace } from "../../slice/workspaceSlice";
import { useQueryClient } from "react-query";
import { setUser } from "../../slice/userSlice";
import styles from "./createPagePanel.module.scss";
import { setPage } from "../../slice/pageSlice";

type CreatePageProps = {
  open: boolean;
  onClose: () => void;
  parentPageId?: string;
};

const CreatePagePanel: React.FC<CreatePageProps> = ({
  open,
  onClose,
  parentPageId,
}) => {
  const { theme } = useContext(ThemeContext);
  const [favorite, setFavorite] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [openPicker, setOpenPicker] = useState(false);
  const [emoji, setEmoji] = useState<string>("");
  const [emojiCode, setEmojiCode] = useState<string>("1f30e");
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const { mutate } = usePageData.useCreatePageData();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const pageMetaData = workspaceInfo?.pages.find(
    (page) => page.id === parentPageId
  );

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

  const handleStarClick = () => {
    setFavorite(!favorite);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleCreatePage = () => {
    const icon = emojiCode;
    const coverPicture = {
      url: "http://sample-url-img.com",
    };
    // TODO content
    const content = {
      type: "doc",
      content: [
        {
          type: "dBlock",
          content: [
            {
              type: "heading",
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: "text",
                  text: "untitled content",
                },
              ],
            },
          ],
        },
      ],
    };

    const isFavorite = favorite ? [userInfo?.id] : [];
    // TODO: page settings
    const pageSettings = {
      font: "serif",
      smallText: true,
      fullWidth: false,
      lock: false,
    };

    const path = pageMetaData ? `,${pageMetaData.reference}.` : null;
    const workspaceId = workspaceInfo?.id!;

    const createPageData = {
      title,
      icon,
      coverPicture,
      content,
      favorite: isFavorite,
      pageSettings,
      path,
      workspaceId,
    };

    mutate(createPageData, {
      onSuccess: async (data) => {
        if (data) {
          const workspaceId = workspaceInfo?.id;
          const user = await request({ url: `/users/${userInfo?.id}` });
          const workspace = await request({
            url: `/workspaces/${workspaceId}`,
          });
          const page = await request({
            url: `/pages/${data.id}`,
          });

          if (pageMetaData) {
            queryClient.invalidateQueries([
              "child-pages",
              pageMetaData.reference,
            ]);
          }

          dispatch(setUser({ ...user.data }));
          dispatch(setWorkspace({ ...workspace.data }));
          dispatch(setPage({ ...page.data }));
          // TODO: redirect to page

          setTitle("");
          setDisplayEmoji(false);

          onClose();
        }
      },
    });
  };

  if (!open) return null;

  return (
    <>
      <div
        className={`${styles.create_page_background} ${styles[theme]}`}
        onClick={onClose}
      >
        <div
          className={`${styles.create_page}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${styles.header}`}>
            <div className={`${styles.left_options}`}>
              <div className={`${styles.icon}`}>
                <OpenPageIcon />
              </div>
              <div className={`${styles.icon}`}>
                <PeekModeIcon />
              </div>
              <div className={`${styles.tab_divider}`}>
                <p>|</p>
              </div>
              <div className={`${styles.add_to}`}>
                <div className={`${styles.text}`}>
                  <p>Add to</p>
                </div>
                <div className={`${styles.parent_page_icon}`}>
                  {pageMetaData ? (
                    <img
                      src={getEmojiUrl(pageMetaData.icon)}
                      onError={(e) => handleBrokenImage(e)}
                      alt="dp"
                      draggable="false"
                    />
                  ) : (
                    <img src={`${userInfo?.profilePicture.url}`} alt="dp" />
                  )}
                </div>
                <div className={`${styles.parent_page_title}`}>
                  {pageMetaData ? (
                    <p>{pageMetaData.title}</p>
                  ) : (
                    <p>Private Pages</p>
                  )}
                </div>
              </div>
            </div>
            <div className={`${styles.right_options}`}>
              <div className={`${styles.tab}`}>
                <p>Share</p>
              </div>
              <div className={`${styles.icon} ${styles.invalid_icon}`}>
                <CommentIcon />
              </div>
              <div className={`${styles.icon} ${styles.invalid_icon}`}>
                <TopUpdateIcon />
              </div>
              <div className={`${styles.icon}`} onClick={handleStarClick}>
                {favorite ? <FillStarIcon /> : <StarOutlineIcon />}
              </div>
              <div className={`${styles.icon}`}>
                {/* TODO: add page options */}
                <TopDotsIcon />
              </div>
            </div>
          </div>
          <div className={`${styles.body}`}>
            {/* TODO: cover photo */}
            <div className={`${styles.cover}`}></div>
            {displayEmoji ? (
              <div
                className={`${styles.emoji_display}`}
                onClick={() => {
                  setOpenPicker(true);
                }}
              >
                <img
                  src={emoji}
                  alt="emoji"
                  width={80}
                  onError={handleBrokenImage}
                />
              </div>
            ) : null}
            <div className={`${styles.title}`}>
              <div className={`${styles.page_options}`}>
                {!displayEmoji ? (
                  <div
                    className={`${styles.add_button}`}
                    onClick={() => {
                      setOpenPicker(true);
                      setDisplayEmoji(!displayEmoji);
                    }}
                  >
                    <AddIconIcon />
                    <p>Add icon</p>
                  </div>
                ) : null}
                <div className={`${styles.add_button}`}>
                  <AddCoverIcon />
                  <p>Add cover</p>
                </div>
              </div>
              <form>
                <input
                  id="title"
                  type="text"
                  value={title}
                  placeholder="Untitled"
                  onChange={handleTitleChange}
                  maxLength={30}
                  autoComplete="off"
                  spellCheck="false"
                  autoFocus
                />
              </form>
            </div>
            <div className={`${styles.content}`}>
              {/* TODO: include text editor */}
            </div>
          </div>
          <div className={`${styles.footer}`}>
            <button onClick={handleCreatePage}>Save</button>
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

export default CreatePagePanel;
