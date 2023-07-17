import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./pageBody.module.scss";
import twemoji from "twemoji";
import { useAppSelector } from "../../app/hooks";
import EmojiSelector from "./EmojiSelector";
import { ThemeContext } from "../../context/ThemeContext";
import { SidebarLogicContext } from "../../context/SidebarContext";
import { debounce } from "lodash";
import { usePageData } from "../../services/usePageData";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setWorkspace } from "../../slice/workspaceSlice";
import { PageState, setPage } from "../../slice/pageSlice";
import { useQueryClient } from "react-query";
import { PageType } from "../../common/types/Workspace";
import { ReactComponent as AddCoverIcon } from "../../assets/icons/add-cover.svg";
import ChangeCover from "../change-cover-panel";
import { getRandomPhoto } from "../../utils/randomImage";
import { useNavigate, useParams } from "react-router-dom";
import Tiptap from "../../tiptap";
import ProjectInfo from "./ProjectInfo";

const PageBody = () => {
  const { theme } = useContext(ThemeContext);
  const { leftOpen, rightOpen } = useContext(SidebarLogicContext);
  const [openPicker, setOpenPicker] = useState(false);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const [emoji, setEmoji] = useState<string>("");
  const [emojiCode, setEmojiCode] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(pageInfo?.title!);
  const [dragging, setDragging] = useState(false);
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [repositionEnabled, setRepositionEnabled] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [openChangeCover, setOpenChangeCover] = useState<boolean>(false);
  const [openProjectInfo, setOpenProjectInfo] = useState<boolean>(false);
  const { mutate: mutateUpdatePageTitle } =
    usePageData.useUpdatePageTitleData();
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const containerRef = useRef(null);
  const { mutate: mutateUpdatePageCover } = usePageData.useUpdatePageCover();
  let { pageReference } = useParams();
  const navigate = useNavigate();

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleAddCover = () => {
    const randomCover = getRandomPhoto();

    const pageData = {
      pageId: pageInfo!.id,
      url: randomCover,
      verticalPosition: 0,
    };

    mutateUpdatePageCover(pageData, {
      onSuccess: async () => {
        const updatedPage: PageState = {
          ...pageInfo!,
          coverPicture: {
            ...pageInfo!.coverPicture,
            url: randomCover,
          },
        };

        dispatch(setPage(updatedPage));
      },
    });
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

  const handleChangeFavicon = (href: string) => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = href;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = href;
      document.head.appendChild(newFavicon);
    }
  };

  useEffect(() => {
    setEmojiCode(null);
  }, [emojiCode]);

  useEffect(() => {
    setTitle(pageInfo?.title!);
  }, [pageInfo?.title]);

  useEffect(() => {
    const saveTitleChange = debounce((title) => {
      if (pageInfo?.title !== title) {
        const pageData = {
          title,
          pageId: pageInfo?.id!,
        };

        mutateUpdatePageTitle(pageData, {
          onSuccess: async () => {
            const previousReference = pageInfo?.reference;

            const page = await request({
              url: `/pages/${pageInfo?.id}`,
            });

            const workspace = await request({
              url: `/workspaces/${workspaceInfo?.id}`,
            });

            dispatch(setPage({ ...page.data }));
            dispatch(setWorkspace({ ...workspace.data }));

            if (pageInfo?.path !== null) {
              queryClient.invalidateQueries(["child-pages", pageInfo?.id]);
            }

            const savedState = localStorage.getItem("pagesListState");
            const parsedSavedState: PageType[] = JSON.parse(savedState!);

            for (let i = 0; i < parsedSavedState.length; i++) {
              if (parsedSavedState[i].id === pageInfo?.id) {
                parsedSavedState[i].title = title;
                break;
              }

              if (parsedSavedState[i].path === `,${previousReference}.`) {
                parsedSavedState[i].path = `,${pageInfo?.reference}.`;
              }
            }

            localStorage.setItem(
              "pagesListState",
              JSON.stringify(parsedSavedState)
            );
          },
        });
      }
    }, 2000);

    saveTitleChange(title);

    return () => {
      saveTitleChange.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleTitleChange]);

  useEffect(() => {
    const saveVerticalPosition = debounce((verticalPosition: number) => {
      if (pageInfo?.coverPicture.verticalPosition !== verticalPosition) {
        const pageData = {
          pageId: pageInfo!.id,
          url: pageInfo?.coverPicture.url!,
          verticalPosition,
        };

        mutateUpdatePageCover(pageData, {
          onSuccess: async () => {
            const updatedPage: PageState = {
              ...pageInfo!,
              coverPicture: {
                ...pageInfo!.coverPicture,
                verticalPosition: verticalPosition,
              },
            };

            dispatch(setPage(updatedPage));
          },
        });
      }
    }, 5000);

    if (verticalPosition !== 0) {
      localStorage.setItem("imagePosition", JSON.stringify(verticalPosition));
      saveVerticalPosition(verticalPosition);
    }

    return () => {
      saveVerticalPosition.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verticalPosition]);

  useEffect(() => {
    const savedPosition = localStorage.getItem("imagePosition");
    if (savedPosition) {
      setVerticalPosition(parseInt(JSON.parse(savedPosition)));
    }
  }, []);

  useEffect(() => {
    const validPath = workspaceInfo?.pages.filter(
      (page) => page.reference === pageReference
    );

    if (validPath?.length === 0) {
      navigate(`/${pageInfo?.reference}`);
    }
  }, [navigate, pageInfo?.reference, pageReference, workspaceInfo?.pages]);

  useEffect(() => {
    handleChangeFavicon(
      `https://twemoji.maxcdn.com/v/latest/72x72/${pageInfo?.icon}.png`
    );
    document.title = pageInfo?.title!;
  }, [pageInfo?.icon, pageInfo?.title]);

  return (
    <>
      <div className={`${styles.content} ${styles[theme]}`}>
        {pageInfo?.coverPicture.url !== "" ? (
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
              <img
                src={pageInfo?.coverPicture.url}
                alt="cover"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div className={`${styles.no_cover}`}></div>
        )}
        {pageInfo?.coverPicture.url !== "" ? (
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
        <div
          className={`${styles.page_content} ${
            pageInfo?.pageSettings.fullWidth ? "" : styles.full_width
          }
          ${pageInfo?.pageSettings.smallText ? styles.small_text : ""}
          ${leftOpen ? styles.left_open : ""}
          ${rightOpen ? styles.right_open : ""}
          ${styles[pageInfo?.pageSettings.font!]}
          `}
        >
          <div
            className={`${styles.emoji_display}`}
            onClick={() => {
              setOpenPicker(true);
            }}
          >
            <img
              src={emojiCode ? emoji : getEmojiUrl(pageInfo?.icon!)}
              onError={(e) => handleBrokenImage(e)}
              alt="dp"
              draggable="false"
            />
          </div>
          <div className={`${styles.page_header_options}`}>
            {pageInfo?.coverPicture.url === "" ? (
              <div className={`${styles.add_button}`} onClick={handleAddCover}>
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
              maxLength={36}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div className={`${styles.editor}`}>
            <Tiptap />
          </div>
          <div
            className={`${styles.project}`}
            onClick={() => {
              setOpenProjectInfo(true);
            }}
          >
            !
          </div>
        </div>
      </div>
      <EmojiSelector
        openPicker={openPicker}
        closePicker={() => setOpenPicker(false)}
        setEmoji={setEmoji}
        setEmojiCode={setEmojiCode}
        leftOpen={leftOpen}
        fullWidth={pageInfo?.pageSettings.fullWidth!}
        cover={pageInfo?.coverPicture.url !== ""}
      />
      <ChangeCover
        open={openChangeCover}
        onClose={() => setOpenChangeCover(false)}
      />
      <ProjectInfo
        open={openProjectInfo}
        onClose={() => setOpenProjectInfo(false)}
      />
    </>
  );
};

export default PageBody;
