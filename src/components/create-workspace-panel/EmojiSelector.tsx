import React, { useContext } from "react";
import Picker from "@emoji-mart/react";
import twemoji from "twemoji";
import styles from "./emojiSelector.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

type EmojiSelectorProps = {
  openPicker: boolean;
  closePicker: () => void;
  setEmoji: (emojiImage: string) => void;
  setEmojiCode: (unified: string) => void;
};

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  openPicker,
  closePicker,
  setEmojiCode,
  setEmoji,
}) => {
  const { theme } = useContext(ThemeContext);

  const emojiSelected = async (data: { unified: string }) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${data.unified}.png`
    );

    setEmojiCode(data.unified);
    setEmoji(emojiImage);
    closePicker();
  };

  if (!openPicker) return null;

  return (
    <div
      className={`${styles.emoji_selector_background}`}
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
