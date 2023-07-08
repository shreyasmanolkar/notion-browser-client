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
import { BubbleMenuPlugin } from "./bubble-menu/bubble-menu-plugin";

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

    // BubbleMenu
  ];
};
