import Tippy from "@tippyjs/react";
import { Editor } from "@tiptap/core";
import { useState } from "react";
import { ReactComponent as DownIcon } from "../../../assets/icons/down-expand.svg";
import styles from "./colorTypeDropDown.module.scss";

export const ColorTypeDropDown = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);

  // const colorType = () => {
  //   if (editor.isActive("toggleHighlight", { color: "red" })) {
  //     return "red";
  //   }
  //   if (editor.isActive("textStyle", { color: "red" })) {
  //     return "red";
  //   }
  //   if (editor.isActive("textStyle", { color: "gray" })) {
  //     return "gray";
  //   }
  //   if (editor.isActive("textStyle", { color: "brown" })) {
  //     return "brown";
  //   }
  //   if (editor.isActive("textStyle", { color: "orange" })) {
  //     return "orange";
  //   }
  //   if (editor.isActive("textStyle", { color: "yellow" })) {
  //     return "yellow";
  //   }
  //   if (editor.isActive("textStyle", { color: "green" })) {
  //     return "green";
  //   }
  //   if (editor.isActive("textStyle", { color: "blue" })) {
  //     return "blue";
  //   }
  //   if (editor.isActive("textStyle", { color: "purple" })) {
  //     return "purple";
  //   }
  //   if (editor.isActive("textStyle", { color: "pink" })) {
  //     return "pink";
  //   }

  //   return "white";
  // };

  return (
    <Tippy
      appendTo={document.body}
      trigger="click"
      interactive
      animation="shift-toward-subtle"
      placement="bottom-start"
      offset={[0, 8]}
      zIndex={9999}
      content={
        <div className={`${styles.color_menu}`}>
          <div className={`${styles.color_menu_dropdown}`}>COLOR</div>
          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("white").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.default}`}>A</div>
              <span className={`${styles.label}`}>Default</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("gray").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.gray}`}>A</div>
              <span className={`${styles.label}`}>Gray</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("brown").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.brown}`}>A</div>
              <span className={`${styles.label}`}>Brown</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("orange").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.orange}`}>A</div>
              <span className={`${styles.label}`}>Orange</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("yellow").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.yellow}`}>A</div>
              <span className={`${styles.label}`}>Yellow</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("green").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.green}`}>A</div>
              <span className={`${styles.label}`}>Green</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("blue").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.blue}`}>A</div>
              <span className={`${styles.label}`}>Blue</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("purple").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.purple}`}>A</div>
              <span className={`${styles.label}`}>Purple</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => editor.chain().focus().setColor("pink").run()}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.pink}`}>A</div>
              <span className={`${styles.label}`}>Pink</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor.chain().focus().setColor("red").run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.red}`}>A</div>
              <span className={`${styles.label}`}>Red</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "gray" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_gray}`}>A</div>
              <span className={`${styles.label}`}>Background Gray</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "brown" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_brown}`}>A</div>
              <span className={`${styles.label}`}>Background Brown</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "orange" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_orange}`}>A</div>
              <span className={`${styles.label}`}>Background Orange</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "yellow" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_yellow}`}>A</div>
              <span className={`${styles.label}`}>Background Yellow</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "green" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_green}`}>A</div>
              <span className={`${styles.label}`}>Background Green</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "blue" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_blue}`}>A</div>
              <span className={`${styles.label}`}>Background Blue</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "purple" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_purple}`}>A</div>
              <span className={`${styles.label}`}>Background Purple</span>
            </div>
          </div>

          <div
            className={`${styles.color_dropdown_button}`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setColor("white")
                .toggleHighlight({ color: "Pink" })
                .run();
            }}
          >
            <div className={`${styles.info}`}>
              <div className={`${styles.background_pink}`}>A</div>
              <span className={`${styles.label}`}>Background Pink</span>
            </div>
          </div>
        </div>
      }
    >
      <div
        className={`${styles.color_toggle_dropdown}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* <span className="truncate">{colorType()}</span> */}
        <span className="truncate">Color</span>
        <DownIcon />
      </div>
    </Tippy>
  );
};
