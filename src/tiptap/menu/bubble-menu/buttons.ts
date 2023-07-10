import { Editor } from "@tiptap/react";

interface BubbleMenuItem {
  tooltip: string;
  action: (editor: Editor) => boolean;
  isActive: (editor: Editor) => boolean;
  iconDetail: [string, string];
}

export const generalButtons: BubbleMenuItem[] = [
  {
    tooltip: "Bold",
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
    iconDetail: ["B", "format_bold"],
  },
  {
    tooltip: "Italic",
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
    iconDetail: ["i", "format_italic"],
  },
  {
    tooltip: "Underline",
    action: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor: Editor) => editor.isActive("underline"),
    iconDetail: ["U", "format_underline"],
  },
  {
    tooltip: "Strike",
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive("strike"),
    iconDetail: ["S", "format_strike"],
  },
  {
    tooltip: "codeBlock",
    action: (editor: Editor) => editor.chain().focus().setCode().run(),
    isActive: (editor: Editor) => editor.isActive("code"),
    iconDetail: ["<>", "format_code"],
  },
];
