import Text from "@tiptap/extension-text";
import Dropcursor from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import { DBlock } from "./d-block";
import Document from "./doc";
import Paragraph from "./paragraph";
import Code from "@tiptap/extension-code";
import TrailingNode from "./trailing-node";
import Placeholder from "./placeholder";
import Link from "./link";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { SuperChargedTableExtensions } from "./supercharged-table/superChargedTableKit";
import { ResizeableMedia } from "./resizableMedia/resizableMedia";
import Mention from "@tiptap/extension-mention";
import { suggestion } from "../menu/slash-menu/suggestions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { v4 } from "uuid";

interface GetExtensionsProps {
  openLinkModal: () => void;
}

export const getExtensions = ({ openLinkModal }: GetExtensionsProps) => {
  return [
    // Necessary
    Document,
    DBlock,
    Text,
    Paragraph,
    Dropcursor.configure({
      width: 2,
      class: "notion-dropcursor",
      color: "skyblue",
    }),
    GapCursor,
    History,
    HardBreak,

    // Mark
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Link.configure({
      autolink: true,
      linkOnPaste: true,
      protocols: ["mailto"],
      openOnClick: true,
      onModKPressed: openLinkModal,
    }),

    // Node
    Heading.configure({
      levels: [1, 2, 3],
    }),
    ListItem,
    BulletList,
    OrderedList,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    TrailingNode,
    Blockquote,
    HorizontalRule,

    // Placeholder
    Placeholder.configure({
      placeholder: "Type '/' for commands",
      includeChildren: true,
    }),

    // Color
    Highlight.configure({
      multicolor: true,
    }),
    TextStyle,
    Color.configure({
      types: ["textStyle"],
    }),

    // table
    ...SuperChargedTableExtensions,

    // Resizable Media
    ResizeableMedia.configure({
      uploadFn: async (image: any) => {
        if (image.name) {
          const imageRef = ref(storage, `images/${image?.name + v4()}`);

          try {
            const snapshot = await uploadBytes(imageRef, image);
            const url = await getDownloadURL(snapshot.ref);
            return url;
          } catch {
            console.error("problem uploading file");
          }
        }
      },
    }),

    // Slash-menu
    Mention.configure({
      suggestion: suggestion,
    }),
  ];
};
