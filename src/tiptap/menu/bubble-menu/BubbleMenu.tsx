import { BubbleMenu, Editor } from "@tiptap/react";
import { NodeTypeDropDown } from "./NodeTypeDropDown";
// import { ColorTypeDropDown } from "./ColorTypeDropDown";
import { generalButtons } from "./buttons";
import styles from "./bubbleMenu.module.scss";
import React, { useMemo } from "react";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = React.memo(
  ({ editor }) => {
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
        className={`${styles.bubble_menu}`}
        tippyOptions={{
          duration: 200,
          animation: "shift-toward-subtle",
          moveTransition: "transform 0.2s ease-in-out",
        }}
      >
        <NodeTypeDropDown editor={editor} />
        {memoizedButtons}
        {/* <ColorTypeDropDown editor={editor} /> */}
      </BubbleMenu>
    );
  }
);
