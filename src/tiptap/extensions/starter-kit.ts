import Text from "@tiptap/extension-text";
import Dropcursor from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";

import { DBlock } from "./d-block";
import Document from "./doc";
import Paragraph from "./paragraph";
import Code from "@tiptap/extension-code";
import Placeholder from "./placeholder";
import Link from "./link";

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

    // Placeholder
    Placeholder.configure({
      placeholder: "Type '/' for commands",
      includeChildren: true,
    }),
  ];
};
