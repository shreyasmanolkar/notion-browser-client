import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { getExtensions } from "./extensions/starter-kit";
import CustomBubbleMenu from "./menu/bubble-menu";
import "./styles.css";

export const Tiptap = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const openLinkModal = () => setIsAddingNewLink(true);

  const editor = useEditor({
    extensions: getExtensions({ openLinkModal }),
    editorProps: {
      attributes: {
        class: `main-editor`,
        spellCheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
  });

  return (
    editor && (
      <>
        <CustomBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  );
};
