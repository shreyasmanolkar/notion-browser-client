import { useContext, useMemo } from "react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus-thick.svg";
import { ReactComponent as DragIcon } from "../../../assets/icons/drag-handle.svg";
import styles from "./dBlockNodeView.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { useAppSelector } from "../../../app/hooks";
import { SidebarLogicContext } from "../../../context/SidebarContext";

export const DBlockNodeView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  const { theme } = useContext(ThemeContext);
  const { leftOpen, rightOpen } = useContext(SidebarLogicContext);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
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

  const fullWidth = pageInfo?.pageSettings.fullWidth!;

  return (
    <>
      <NodeViewWrapper
        as="div"
        className={`${styles.dblock} ${styles[theme]} ${
          fullWidth ? styles.full_width : ""
        } ${leftOpen ? styles.left_open : ""} ${
          rightOpen ? styles.right_open : ""
        }`}
      >
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
