import React, { useContext, useEffect, useState } from "react";
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
import { setPage } from "../../slice/pageSlice";
import { useQueryClient } from "react-query";
import { PageType } from "../../common/types/Workspace";
import { ReactComponent as AddCoverIcon } from "../../assets/icons/add-cover.svg";

const PageBody = () => {
  const { theme } = useContext(ThemeContext);
  const { leftOpen } = useContext(SidebarLogicContext);
  const [openPicker, setOpenPicker] = useState(false);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const [emoji, setEmoji] = useState<string>("");
  const [emojiCode, setEmojiCode] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(pageInfo?.title!);
  const [cover, setCover] = useState<boolean>(false);
  const { mutate: mutateUpdatePageTitle } =
    usePageData.useUpdatePageTitleData();
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
    setCover(true);
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

  return (
    <>
      <div className={`${styles.content} ${styles[theme]}`}>
        {cover ? (
          <div className={`${styles.cover}`}>
            <div className={`${styles.image_wrapper}`}>
              <img
                src="https://images.unsplash.com/photo-1685555845405-1503f76a5462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="cover"
              />
            </div>
          </div>
        ) : (
          <div className={`${styles.no_cover}`}></div>
        )}
        {cover ? (
          <div className={`${styles.image_footer}`}>
            <div className={`${styles.image_option}`}>Change cover</div>
            <div className={`${styles.image_option}`}>Reposition</div>
          </div>
        ) : (
          ""
        )}
        <div
          className={`${styles.page_content} ${
            pageInfo?.pageSettings.fullWidth ? "" : styles.full_width
          }
          ${pageInfo?.pageSettings.smallText ? styles.small_text : ""}
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
            {!cover ? (
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
        </div>
      </div>
      <EmojiSelector
        openPicker={openPicker}
        closePicker={() => setOpenPicker(false)}
        setEmoji={setEmoji}
        setEmojiCode={setEmojiCode}
        leftOpen={leftOpen}
        fullWidth={pageInfo?.pageSettings.fullWidth!}
      />
    </>
  );
};

export default PageBody;
