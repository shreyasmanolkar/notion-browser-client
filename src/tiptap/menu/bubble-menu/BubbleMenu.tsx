import { BubbleMenu, Editor } from "@tiptap/react";
import { generalButtons } from "./buttons";
// import { NodeTypeDropDown } from "./NodeTypeDropDown";
// import { ColorTypeDropDown } from "./ColorTypeDropDown";
import styles from "./bubbleMenu.module.scss";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = ({
  editor,
}) => {
  return (
    <BubbleMenu
      editor={editor}
      className={`${styles.bubble_menu}`}
      tippyOptions={{
        duration: 100,
        animation: "shift-toward-subtle",
        moveTransition: "transform 0.2s ease-in-out",
        hideOnClick: true,
      }}
    >
      {/* <NodeTypeDropDown editor={editor} /> */}
      {generalButtons.map((btn) => {
        return (
          <div
            className={`${styles.bubble_menu_button}`}
            onClick={() => btn.action(editor)}
            key={btn.tooltip}
          >
            <div className={`${styles[btn.iconDetail[1]]}`}>
              {btn.iconDetail[0]}
            </div>
          </div>
        );
      })}
      {/* <ColorTypeDropDown editor={editor} /> */}
    </BubbleMenu>
  );
};
