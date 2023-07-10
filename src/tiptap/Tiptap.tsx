import { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { getExtensions } from "./extensions/starter-kit";
import CustomBubbleMenu from "./menu/bubble-menu";
import { useAppSelector } from "../app/hooks";
import { Editor } from "@tiptap/core";
import "./styles.css";
import { debounce } from "lodash";
import { request } from "../lib/axios";
import { useDispatch } from "react-redux";
import { usePageData } from "../services/usePageData";
import { setPage } from "../slice/pageSlice";

export const Tiptap = () => {
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const openLinkModal = () => setIsAddingNewLink(true);
  const { mutate: mutateUpdatePageContent } =
    usePageData.useUpdatePageContentData();
  const dispatch = useDispatch();
  const [pageContent, setPageContent] = useState<any>(null);

  const logContent = useCallback(
    (e: Editor) => handleContentUpdate(e.getJSON()),
    []
  );

  const handleContentUpdate = (content: any) => {
    setPageContent(content);
  };

  useEffect(() => {
    const savePageContent = debounce((content) => {
      if (pageInfo?.content !== content) {
        const pageData = {
          content,
          pageId: pageInfo?.id!,
        };

        mutateUpdatePageContent(pageData, {
          onSuccess: async () => {
            const page = await request({
              url: `/pages/${pageInfo?.id}`,
            });

            dispatch(setPage({ ...page.data }));
          },
        });
      }
    }, 2000);

    savePageContent(pageContent);

    return () => {
      savePageContent.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleContentUpdate]);

  // const contentUpdate = async (content: any, pageId: string) => {
  //   console.log("co", content);
  //   const pageData = {
  //     content,
  //     pageId,
  //   };

  //   mutateUpdatePageContent(pageData, {
  //     onSuccess: async () => {
  //       const page = await request({
  //         url: `/pages/${pageInfo}`,
  //       });

  //       dispatch(setPage({ ...page.data }));
  //     },
  //   });
  // };

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
      editor?.setEditable(!pageInfo?.pageSettings.lock!);
      editor?.commands.setContent(pageInfo?.content);
      setPageContent(pageInfo?.content);
    }, 0);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

  return (
    editor && (
      <>
        <CustomBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  );
};
