import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { getExtensions } from "./extensions/starter-kit";
import CustomBubbleMenu from "./menu/bubble-menu";
import { useAppSelector } from "../app/hooks";
import "./styles.css";

export const Tiptap = () => {
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const openLinkModal = () => setIsAddingNewLink(true);

  useEffect(() => {
    editor?.setEditable(!pageInfo?.pageSettings.lock!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

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
