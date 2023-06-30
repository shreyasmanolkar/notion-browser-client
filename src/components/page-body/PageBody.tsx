import React, { useState } from "react";
import styles from "./pageBody.module.scss";
import twemoji from "twemoji";
import { useAppSelector } from "../../app/hooks";
import EmojiSelector from "./EmojiSelector";

const PageBody = () => {
  const [openPicker, setOpenPicker] = useState(false);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const [emoji, setEmoji] = useState<string>("");
  const [emojiCode, setEmojiCode] = useState<string | null>(null);

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

  return (
    <>
      <div className={`${styles.content}`}>
        <div className={`${styles.cover}`}></div>
        <div className={`${styles.page_content}`}>
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

export default PageBody;
