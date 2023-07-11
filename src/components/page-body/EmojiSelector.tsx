import React, { useContext } from "react";
import Picker from "@emoji-mart/react";
import twemoji from "twemoji";
import styles from "./emojiSelector.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { usePageData } from "../../services/usePageData";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { setPage } from "../../slice/pageSlice";
import { request } from "../../lib/axios";
import { setWorkspace } from "../../slice/workspaceSlice";
import { PageType } from "../../common/types/Workspace";
import { useQueryClient } from "react-query";

type EmojiSelectorProps = {
  openPicker: boolean;
  closePicker: () => void;
  setEmoji: (emojiImage: string) => void;
  setEmojiCode: (unified: string) => void;
  leftOpen: boolean;
  fullWidth: boolean;
  cover: boolean;
};

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  openPicker,
  closePicker,
  setEmojiCode,
  setEmoji,
  leftOpen,
  fullWidth,
  cover,
}) => {
  const { theme } = useContext(ThemeContext);
  const { mutate: mutateUpdatePageIcon } = usePageData.useUpdatePageIconData();
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const emojiSelected = async (data: { unified: string }) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${data.unified}.png`
    );

    setEmojiCode(data.unified);
    setEmoji(emojiImage);

    const pageData = {
      icon: data.unified!,
      pageId: pageInfo?.id!,
    };

    mutateUpdatePageIcon(pageData, {
      onSuccess: async () => {
        const updatedPage = {
          ...pageInfo!,
          icon: data.unified,
        };
        const workspace = await request({
          url: `/workspaces/${workspaceInfo?.id}`,
        });
        dispatch(setPage(updatedPage));
        dispatch(setWorkspace({ ...workspace.data }));

        if (pageInfo?.path !== null) {
          queryClient.invalidateQueries(["child-pages", pageInfo?.id]);
        }

        const savedState = localStorage.getItem("pagesListState");
        const parsedSavedState: PageType[] = JSON.parse(savedState!);

        for (let i = 0; i < parsedSavedState.length; i++) {
          if (parsedSavedState[i].id === pageInfo?.id) {
            parsedSavedState[i].icon = data.unified;
            break;
          }
        }

        localStorage.setItem(
          "pagesListState",
          JSON.stringify(parsedSavedState)
        );
      },
    });
    closePicker();
  };

  if (!openPicker) return null;

  return (
    <div
      className={`${styles.emoji_selector_background} ${
        fullWidth ? styles.full_width : ""
      } ${leftOpen ? "" : styles.left_open} ${cover ? styles.cover : ""}`}
      onClick={closePicker}
    >
      <div
        className={`${styles.emoji_selector}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Picker set="twitter" onEmojiSelect={emojiSelected} theme={theme} />
      </div>
    </div>
  );
};

export default EmojiSelector;
