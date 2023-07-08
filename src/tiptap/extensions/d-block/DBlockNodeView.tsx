import { useMemo } from "react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus-thick.svg";
import { ReactComponent as DragIcon } from "../../../assets/icons/drag-handle.svg";
import styles from "./dBlockNodeView.module.scss";

export const DBlockNodeView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  const isTable = useMemo(() => {
    const { content } = node.content as any;

    return content[0].type.name === "table";
  }, [node.content]);

  const createNodeAfter = () => {
    const pos = getPos() + node.nodeSize;

    editor.commands.insertContentAt(pos, {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    });
  };

  return (
    <>
      <NodeViewWrapper as="div" className={`${styles.dblock}`}>
        <section className={`${styles.wrapper_section}`} aria-label="left-menu">
          <div className={`${styles.icon}`} onClick={createNodeAfter}>
            <PlusIcon />
          </div>
          <div className={`${styles.icon}`} draggable data-drag-handle>
            <DragIcon />
          </div>
        </section>

        <NodeViewContent
          className={`${styles.dblock_view} ${
            isTable ? styles.margin_left : ""
          }`}
        />
      </NodeViewWrapper>
    </>
  );
};
