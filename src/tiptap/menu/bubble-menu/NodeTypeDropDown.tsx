import Tippy from "@tippyjs/react";
import { Editor } from "@tiptap/core";
import { useState } from "react";
import { ReactComponent as DownIcon } from "../../../assets/icons/down-expand.svg";
import styles from "./nodeTypeDropDown.module.scss";

export const NodeTypeDropDown = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);

  // const buttonText = () => {
  //   if (editor.isActive("heading", { level: 1 })) {
  //     return "Heading 1";
  //   }
  //   if (editor.isActive("heading", { level: 2 })) {
  //     return "Heading 2";
  //   }
  //   if (editor.isActive("heading", { level: 3 })) {
  //     return "Heading 3";
  //   }
  //   if (editor.isActive("orderedList")) {
  //     return "Number List";
  //   }
  //   if (editor.isActive("bulletList")) {
  //     return "Bullet List";
  //   }
  //   return "Normal Text";
  // };

  const isOnlyParagraph =
    !editor.isActive("bulletList") &&
    !editor.isActive("orderedList") &&
    !editor.isActive("heading");

  return (
    <Tippy
      appendTo={document.body}
      trigger="click"
      interactive
      animation="shift-toward-subtle"
      placement="bottom-start"
      content={
        <div className={`${styles.bubble_menu}`}>
          <div className={`${styles.bubble_menu_dropdown}`}>Turn Into</div>
          <div
            className={`${styles.bubble_dropdown_item}`}
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <div className={`${styles.bubble_dropdown_button}`}>
              <div className={`${styles.info}`}>
                <img src="/editor/text.png" alt="Text" width="24" height="24" />
                <span className={`${styles.bubble_dropdown_button_label}`}>
                  Text
                </span>
              </div>
              {isOnlyParagraph && (
                <div className={`${styles.icon}`}>&#10003;</div>
              )}
            </div>
          </div>
          <div
            className={`${styles.bubble_dropdown_item}`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <div className={`${styles.bubble_dropdown_button}`}>
              <div className={`${styles.info}`}>
                <img
                  src="/editor/header.png"
                  alt="Heading 1"
                  width="24"
                  height="24"
                />
                <span className={`${styles.bubble_dropdown_button_label}`}>
                  Heading 1
                </span>
              </div>
              {editor.isActive("heading", { level: 1 }) && (
                <div className={`${styles.icon}`}>&#10003;</div>
              )}
            </div>
          </div>
          <div
            className={`${styles.bubble_dropdown_item}`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <div className={`${styles.bubble_dropdown_button}`}>
              <div className={`${styles.info}`}>
                <img
                  src="/editor/header.png"
                  alt="Heading 2"
                  width="24"
                  height="24"
                />
                <span className={`${styles.bubble_dropdown_button_label}`}>
                  Heading 2
                </span>
              </div>
              {editor.isActive("heading", { level: 2 }) && (
                <div className={`${styles.icon}`}>&#10003;</div>
              )}
            </div>
          </div>
          <div
            className={`${styles.bubble_dropdown_item}`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <div className={`${styles.bubble_dropdown_button}`}>
              <div className={`${styles.info}`}>
                <img
                  src="/editor/header.png"
                  alt="Heading 3"
                  width="24"
                  height="24"
                />
                <span className={`${styles.bubble_dropdown_button_label}`}>
                  Heading 3
                </span>
              </div>
              {editor.isActive("heading", { level: 3 }) && (
                <div className={`${styles.icon}`}>&#10003;</div>
              )}
            </div>
          </div>
          <div
            className={`${styles.bubble_dropdown_item}`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <div className={`${styles.bubble_dropdown_button}`}>
              <div className={`${styles.info}`}>
                <img
                  src="/editor/numbered-list.png"
                  alt="Numbered List"
                  width="24"
                  height="24"
                />
                <span className={`${styles.bubble_dropdown_button_label}`}>
                  Numbered List
                </span>
              </div>
              {editor.isActive("orderedList") && (
                <div className={`${styles.icon}`}>&#10003;</div>
              )}
            </div>
          </div>
          <div
            className={`${styles.bubble_dropdown_item}`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <div className={`${styles.bubble_dropdown_button}`}>
              <div className={`${styles.info}`}>
                <img
                  src="/editor/numbered-list.png"
                  alt="Bulleted List"
                  width="24"
                  height="24"
                />
                <span className={`${styles.bubble_dropdown_button_label}`}>
                  Bulleted List
                </span>
              </div>
              {editor.isActive("bulletList") && (
                <div className={`${styles.icon}`}>&#10003;</div>
              )}
            </div>
          </div>
        </div>
      }
    >
      <div
        className={`${styles.bubble_toggle_dropdown}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">Node</span>
        <DownIcon />
      </div>
    </Tippy>
  );
};
