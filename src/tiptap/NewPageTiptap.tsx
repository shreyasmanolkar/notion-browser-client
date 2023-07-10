import { useCallback, useContext, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { getExtensions } from "./extensions/starter-kit";
import CustomBubbleMenu from "./menu/bubble-menu";
import { Editor } from "@tiptap/core";
import { debounce } from "lodash";
import { NewPageContext } from "../context/NewPageContext";
import "./styles.css";

export const NewPageTiptap = () => {
  const { content, setContent, pageSettings } = useContext(NewPageContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const openLinkModal = () => setIsAddingNewLink(true);
  const [pageContent, setPageContent] = useState<any>(null);

  const logContent = useCallback(
    (e: Editor) => handleContentUpdate(e.getJSON()),
    []
  );

  const handleContentUpdate = (content: any) => {
    setPageContent(content);
  };

  useEffect(() => {
    const savePageContent = debounce((pageContent) => {
      setContent(pageContent);
    }, 2000);

    savePageContent(pageContent);

    return () => {
      savePageContent.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleContentUpdate]);

  const editor = useEditor({
    extensions: getExtensions({ openLinkModal }),
    editorProps: {
      attributes: {
        class: `main-editor`,
        spellCheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    onUpdate: ({ editor: e }) => {
      logContent(e);
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      editor?.setEditable(!pageSettings.lock!);
      editor?.commands.setContent(content);
      setPageContent(content);
    }, 0);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    editor && (
      <>
        <CustomBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  );
};
