import { Editor, Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import fuzzysort from "fuzzysort";
import tippy from "tippy.js";
import { stopPrevent } from "../../utils/eventModifier";
import { CommandList } from "./CommandList";

interface SlashMenuItem {
  title: string;
  command: (params: { editor: Editor; range: Range }) => void;
  iconClass: string;
  shortcut: string;
  type: string;
  desc: string;
}

const SlashMenuItems: Partial<SlashMenuItem>[] = [
  {
    title: "Heading 1",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
    iconClass: "mdi:format-heading-1",
    shortcut: "#",
  },
  {
    title: "Heading 2",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
    iconClass: "mdi:format-heading-2",
    shortcut: "##",
  },
  {
    title: "Heading 3",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
    iconClass: "mdi:format-heading-3",
    shortcut: "###",
  },
  {
    title: "Ordered List",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
    iconClass: "ri-list-ordered",
    shortcut: "1. L",
  },
  {
    title: "Bullet List",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
    iconClass: "ri-list-unordered",
    shortcut: "- L",
  },
  {
    title: "Task List",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
    iconClass: "material-symbols:check-box-outline-rounded",
    shortcut: "- TL",
  },
  {
    title: "Block Quote",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
    iconClass: "material-symbols:format-quote",
    shortcut: "- BQ",
  },
  {
    title: "Divider",
    command: ({ editor, range }) => {
      editor.chain().deleteRange(range).setHorizontalRule().run();
    },
    iconClass: "material-symbols:horizontal-rule",
    shortcut: "- D",
  },
  {
    title: "Code",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCode().run();
    },
    iconClass: "material-symbols:code",
    shortcut: "- C",
  },
  {
    title: "Image",
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .setMedia({
          src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
          "media-type": "img",
          alt: "Something else",
          title: "Something",
          width: "800",
          height: "400",
        })
        .run();
    },
    iconClass: "material-symbols:broken-image-outline",
    shortcut: "- I",
  },
  {
    title: "Video",
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .setMedia({
          src: "https://www.youtube.com/watch?v=XS088Opj9o0",
          "media-type": "video",
          alt: "Some video",
          title: "Some Title Video",
          width: "800",
          height: "400",
        })
        .run();
    },
    iconClass: "material-symbols:video-camera-back-rounded",
    shortcut: "- V",
  },
  {
    title: "Table",
    command: ({ editor, range }) => {
      // editor.chain().focus().deleteRange(range).toggleBulletList().run();

      editor
        .chain()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
    iconClass: "material-symbols:table-chart-outline",
    shortcut: "- T",
  },
  {
    title: "Two Column",
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
        .run();
    },
    iconClass: "material-symbols:view-column-2",
    shortcut: "- TC",
  },
  {
    title: "Three Column",
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertTable({ rows: 1, cols: 3, withHeaderRow: false })
        .run();
    },
    iconClass: "material-symbols:view-column",
    shortcut: "- THC",
  },
  {
    title: "Four Column",
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertTable({ rows: 1, cols: 4, withHeaderRow: false })
        .run();
    },
    iconClass: "material-symbols:view-column-4",
    shortcut: "- FC",
  },
];

export const suggestion = {
  char: "/",
  command: ({ editor, range, props }: any) => {
    props.command({ editor, range, props });
  },
  items: ({ query: q }: { query: string }) => {
    const query = q.toLowerCase().trim();

    if (!query) return SlashMenuItems;

    const fuzzyResults = fuzzysort
      .go(query, SlashMenuItems, { key: "title" })
      .map((item) => ({
        ...item,
        highlightedTitle: fuzzysort.highlight(item, "<b>", "</b>"),
      }));

    return fuzzyResults.map(({ obj, highlightedTitle }) => ({
      ...obj,
      highlightedTitle,
    }));
  },

  render: () => {
    let component: ReactRenderer;
    let popup: { destroy: () => void }[];
    let localProps: Record<string, any> | undefined;

    return {
      onStart: (props: Record<string, any> | undefined) => {
        localProps = { ...props, event: "" };

        component = new ReactRenderer(CommandList, {
          props: localProps,
          editor: localProps?.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: localProps.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
          animation: "shift-toward-subtle",
          duration: 250,
        });
      },

      onUpdate(props: Record<string, any> | undefined) {
        localProps = { ...props, event: "" };

        component.updateProps(localProps);

        (popup[0] as any).setProps({
          getReferenceClientRect: localProps.clientRect,
        });
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        component.updateProps({ ...localProps, event: props.event });

        (component.ref as any).onKeyDown({ event: props.event });

        if (props.event.key === "Escape") {
          (popup[0] as any).hide();

          return true;
        }

        if (props.event.key === "Enter") {
          stopPrevent(props.event);

          return true;
        }

        return false;
      },

      onExit() {
        if (popup && popup[0]) popup[0]?.destroy();
        if (component) component.destroy();
      },
    };
  },
};
