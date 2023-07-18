import React, { useContext, useRef, useState } from "react";
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
import CreatePageOptions from "./CreatePageOptions";
import { NewPageContext } from "../../context/NewPageContext";
import { getRandomPhoto } from "../../utils/randomImage";
import ChangeNewPageCoverPanel from "./cover-panel/ChangeNewPageCoverPanel";
import { NewPageTiptap } from "../../tiptap/NewPageTiptap";
import { useNavigate } from "react-router-dom";

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
  const { pageSettings, content, coverPicture, setCoverPicture } =
    useContext(NewPageContext);
  const [favorite, setFavorite] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [openPicker, setOpenPicker] = useState(false);
  const [openPageOptions, setOpenPageOptions] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("");
  const [emojiCode, setEmojiCode] = useState<string>("1f30e");
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const [dragging, setDragging] = useState(false);
  const { mutate } = usePageData.useCreatePageData();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const containerRef = useRef(null);
  const [repositionEnabled, setRepositionEnabled] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [openChangeCover, setOpenChangeCover] = useState<boolean>(false);
  const navigate = useNavigate();

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

    const isFavorite = favorite ? [userInfo?.id] : [];

    const path = pageMetaData ? `,${pageMetaData.reference}.` : null;
    const workspaceId = workspaceInfo?.id!;

    const createPageData = {
      title,
      icon,
      coverPicture,
      content: { ...content },
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
            queryClient.invalidateQueries(["child-pages", pageMetaData.id]);
          }

          dispatch(setUser({ ...user.data }));
          dispatch(setWorkspace({ ...workspace.data }));
          dispatch(setPage({ ...page.data }));

          navigate(`/${page.data.reference}`);
          setTitle("");
          setDisplayEmoji(false);

          const coverPictureData = {
            url: "",
            verticalPosition: 0,
          };

          setCoverPicture(coverPictureData);

          onClose();
        }
      },
    });
  };

  const handleAddCover = () => {
    const randomCover = getRandomPhoto();

    const coverPictureData = {
      url: randomCover,
      verticalPosition: 0,
    };

    setCoverPicture(coverPictureData);
  };

  const handleReposition = () => {
    setRepositionEnabled((prevEnabled) => !prevEnabled);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (repositionEnabled) {
      setDragging(true);
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (repositionEnabled) {
      setDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !repositionEnabled || !containerRef.current) return;

    const containerElement = containerRef.current as HTMLDivElement;
    const containerHeight = containerElement.offsetHeight;

    const firstChild = containerElement.firstChild as HTMLDivElement | null;
    if (!firstChild) return;

    const imageHeight = firstChild.offsetHeight;

    const dy = e.clientY - startPosition.y;
    const maxVerticalPosition = containerHeight - imageHeight;

    let updatedVerticalPosition = verticalPosition + dy;
    updatedVerticalPosition = Math.max(
      updatedVerticalPosition,
      maxVerticalPosition
    );
    updatedVerticalPosition = Math.min(updatedVerticalPosition, 0);

    setVerticalPosition(updatedVerticalPosition);
    setStartPosition({ x: e.clientX, y: e.clientY });
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
              <div
                className={`${styles.icon}`}
                onClick={() => {
                  setOpenPageOptions(!openPageOptions);
                }}
              >
                <TopDotsIcon />
              </div>
            </div>
          </div>
          <div
            className={`${styles.body}
              ${pageSettings.smallText ? styles.small_text : ""}
              ${styles[pageSettings.font!]}
          `}
          >
            {coverPicture.url !== "" ? (
              <div
                className={`${styles.cover} ${dragging ? styles.dragging : ""}`}
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div
                  className={`${styles.image_wrapper}`}
                  style={{ transform: `translateY(${verticalPosition}px)` }}
                >
                  <img src={coverPicture.url} alt="cover" draggable={false} />
                </div>
              </div>
            ) : (
              <div className={`${styles.no_cover}`}></div>
            )}
            {coverPicture.url !== "" ? (
              <div className={`${styles.image_footer}`}>
                <div
                  className={`${styles.image_option}`}
                  onClick={() => {
                    setOpenChangeCover(true);
                  }}
                >
                  Change cover
                </div>
                <div
                  className={`${styles.image_option}`}
                  onClick={handleReposition}
                >
                  {repositionEnabled ? "Save" : "Reposition"}
                </div>
              </div>
            ) : (
              ""
            )}
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
                {coverPicture.url === "" ? (
                  <div
                    className={`${styles.add_button}`}
                    onClick={handleAddCover}
                  >
                    <AddCoverIcon />
                    <p>Add cover</p>
                  </div>
                ) : (
                  ""
                )}
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
            <div className={`${styles.editor}`}>
              <NewPageTiptap />
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
      <CreatePageOptions
        open={openPageOptions}
        onClose={() => setOpenPageOptions(false)}
        favorite={favorite!}
        onFavoriteClick={() => setFavorite(!favorite)}
      />
      <ChangeNewPageCoverPanel
        open={openChangeCover}
        onClose={() => setOpenChangeCover(false)}
      />
    </>
  );
};

export default CreatePagePanel;
