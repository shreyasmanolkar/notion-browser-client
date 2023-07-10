import { BubbleMenu, Editor } from "@tiptap/react";
import { NodeTypeDropDown } from "./NodeTypeDropDown";
import { ColorTypeDropDown } from "./ColorTypeDropDown";
import { generalButtons } from "./buttons";
import { ReactComponent as GoToIcon } from "../../../assets/icons/go-to.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment.svg";
import { ReactComponent as MentionIcon } from "../../../assets/icons/mention.svg";
import styles from "./bubbleMenu.module.scss";
import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = React.memo(
  ({ editor }) => {
    const { theme } = useContext(ThemeContext);

    const memoizedButtons = useMemo(() => {
      return generalButtons.map((btn) => (
        <div
          className={`${styles.bubble_menu_button}`}
          onClick={() => btn.action(editor)}
          key={btn.tooltip}
        >
          <div className={`${styles[btn.iconDetail[1]]}`}>
            {btn.iconDetail[0]}
          </div>
        </div>
      ));
    }, [editor]);

    return (
      <BubbleMenu
        editor={editor}
        className={`${styles.bubble_menu} ${styles[theme]}`}
        tippyOptions={{
          duration: 200,
          animation: "shift-toward-subtle",
          moveTransition: "transform 0.2s ease-in-out",
        }}
      >
        <div className={`${styles.drop_down}`}>
          <NodeTypeDropDown editor={editor} />
        </div>
        <div className={`${styles.divider}`}> </div>
        <div className={`${styles.filler_button}`}>
          <div className={`${styles.icon}`}>
            <GoToIcon />
          </div>
          Link
        </div>
        <div className={`${styles.divider}`}> </div>
        <div className={`${styles.filler_button}`}>
          <div className={`${styles.icon} ${styles.comment}`}>
            <CommentIcon />
          </div>
          Comment
        </div>
        <div className={`${styles.divider}`}> </div>
        {memoizedButtons}
        <div className={`${styles.divider}`}> </div>
        <div className={`${styles.drop_down}`}>
          <ColorTypeDropDown editor={editor} />
        </div>
        <div className={`${styles.divider}`}> </div>
        <div className={`${styles.filler_button}`}>
          <div className={`${styles.icon}`}>
            <MentionIcon />
          </div>
        </div>
      </BubbleMenu>
    );
  }
);
