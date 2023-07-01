import React, { useContext, useEffect, useState } from "react";
import styles from "./pageBody.module.scss";
import twemoji from "twemoji";
import { useAppSelector } from "../../app/hooks";
import EmojiSelector from "./EmojiSelector";
import { ThemeContext } from "../../context/ThemeContext";
import { SidebarLogicContext } from "../../context/SidebarContext";

const PageBody = () => {
  const { theme } = useContext(ThemeContext);
  const { leftOpen } = useContext(SidebarLogicContext);
  const [openPicker, setOpenPicker] = useState(false);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const [emoji, setEmoji] = useState<string>("");
  const [emojiCode, setEmojiCode] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(pageInfo?.title!);

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

  useEffect(() => {
    setEmojiCode(null);
  }, [emojiCode]);

  useEffect(() => {
    setTitle(pageInfo?.title!);
  }, [pageInfo?.title]);

  return (
    <>
      <div className={`${styles.content} ${styles[theme]}`}>
        <div className={`${styles.cover}`}></div>
        <div
          className={`${styles.page_content} ${
            pageInfo?.pageSettings.fullWidth ? "" : styles.full_width
          }
          ${pageInfo?.pageSettings.smallText ? styles.small_text : ""}
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
