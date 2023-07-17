import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useContext, useEffect, useRef, useState } from "react";
import { resizableMediaActions } from "./resizableMediaMenuUtil";
import { Icon } from "@iconify/react";

import styles from "./resizableMediaNodeView.module.scss";
import { useAppSelector } from "../../../app/hooks";
import { ThemeContext } from "../../../context/ThemeContext";
import { SidebarLogicContext } from "../../../context/SidebarContext";

let lastClientX: number;

export const ResizableMediaNodeView = ({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) => {
  const { theme } = useContext(ThemeContext);
  const { leftOpen, rightOpen } = useContext(SidebarLogicContext);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);

  const [mediaType, setMediaType] = useState<"img" | "video">();

  useEffect(() => {
    setMediaType(node.attrs["media-type"]);
  }, [node.attrs]);

  const [aspectRatio, setAspectRatio] = useState(0);

  const [proseMirrorContainerWidth, setProseMirrorContainerWidth] = useState(0);

  const [mediaActionActiveState, setMediaActionActiveState] = useState<
    Record<string, boolean>
  >({});

  const resizableImgRef = useRef<HTMLImageElement | HTMLVideoElement | null>(
    null
  );

  const calculateMediaActionActiveStates = () => {
    const activeStates: Record<string, boolean> = {};

    resizableMediaActions.forEach(({ tooltip, isActive }) => {
      activeStates[tooltip] = !!isActive?.(node.attrs);
    });

    setMediaActionActiveState(activeStates);
  };

  useEffect(() => {
    calculateMediaActionActiveStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.attrs]);

  const mediaSetupOnLoad = () => {
    // ! TODO: move this to extension storage
    const proseMirrorContainerDiv = document.querySelector(".ProseMirror");

    if (proseMirrorContainerDiv)
      setProseMirrorContainerWidth(proseMirrorContainerDiv?.clientWidth);

    // When the media has loaded
    if (!resizableImgRef.current) return;

    if (mediaType === "video") {
      const video = resizableImgRef.current as HTMLVideoElement;

      video.addEventListener("loadeddata", function () {
        // Aspect Ratio from its original size
        setAspectRatio(video.videoWidth / video.videoHeight);

        // for the first time when video is added with custom width and height
        // and we have to adjust the video height according to it's width
        onHorizontalResize("left", 0);
      });
    } else {
      resizableImgRef.current.onload = () => {
        // Aspect Ratio from its original size
        setAspectRatio(
          (resizableImgRef.current as HTMLImageElement).naturalWidth /
            (resizableImgRef.current as HTMLImageElement).naturalHeight
        );
      };
    }

    setTimeout(() => calculateMediaActionActiveStates(), 200);
  };

  const setLastClientX = (x: number) => {
    lastClientX = x;
  };

  useEffect(() => {
    mediaSetupOnLoad();
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHorizontalResizeActive, setIsHorizontalResizeActive] =
    useState(false);

  interface WidthAndHeight {
    width: number;
    height: number;
  }

  const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
    width < 100 || height < 100;

  const documentHorizontalMouseMove = (e: MouseEvent) => {
    setTimeout(() => onHorizontalMouseMove(e));
  };

  const startHorizontalResize = (e: { clientX: number }) => {
    setIsHorizontalResizeActive(true);
    lastClientX = e.clientX;

    setTimeout(() => {
      document.addEventListener("mousemove", documentHorizontalMouseMove);
      document.addEventListener("mouseup", stopHorizontalResize);
    });
  };

  const stopHorizontalResize = () => {
    setIsHorizontalResizeActive(false);
    lastClientX = -1;

    document.removeEventListener("mousemove", documentHorizontalMouseMove);
    document.removeEventListener("mouseup", stopHorizontalResize);
  };

  const onHorizontalResize = (
    directionOfMouseMove: "right" | "left",
    diff: number
  ) => {
    if (!resizableImgRef.current) {
      console.error("Media ref is undefined|null", {
        resizableImg: resizableImgRef.current,
      });
      return;
    }

    const currentMediaDimensions = {
      width: resizableImgRef.current?.width,
      height: resizableImgRef.current?.height,
    };

    const newMediaDimensions = {
      width: -1,
      height: -1,
    };

    if (directionOfMouseMove === "left") {
      newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff);
    } else {
      newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff);
    }

    if (newMediaDimensions.width > proseMirrorContainerWidth)
      newMediaDimensions.width = proseMirrorContainerWidth;

    newMediaDimensions.height = newMediaDimensions.width / aspectRatio;

    if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

    updateAttributes(newMediaDimensions);
  };

  const onHorizontalMouseMove = (e: MouseEvent) => {
    if (lastClientX === -1) return;

    const { clientX } = e;

    const diff = lastClientX - clientX;

    if (diff === 0) return;

    const directionOfMouseMove: "left" | "right" = diff > 0 ? "left" : "right";

    setTimeout(() => {
      onHorizontalResize(directionOfMouseMove, Math.abs(diff));
      lastClientX = clientX;
    });
  };

  const [isFloat, setIsFloat] = useState<boolean>();

  useEffect(() => {
    setIsFloat(node.attrs.dataFloat);
  }, [node.attrs]);

  const [isAlign, setIsAlign] = useState<boolean>();

  useEffect(() => {
    setIsAlign(node.attrs.dataAlign);
  }, [node.attrs]);

  let floatClass = "";
  if (isFloat) {
    floatClass = styles[`f_${node.attrs.dataFloat}`];
  }

  let alignClass = "";
  if (isAlign) {
    alignClass = styles[`justify_${node.attrs.dataAlign}`];
  }

  return (
    <NodeViewWrapper
      as="article"
      className={`${styles.media_node_view} ${
        pageInfo?.pageSettings.fullWidth ? "" : styles.full_width
      } ${floatClass} ${alignClass} ${styles[theme]} ${
        leftOpen ? styles.left_open : ""
      } ${rightOpen ? styles.right_open : ""}`}
    >
      <div className={`${styles.inner_media} ${styles.group}`}>
        {mediaType === "img" && (
          <img
            src={node.attrs.src}
            ref={resizableImgRef as any}
            className={`${styles.media_box}`}
            alt={node.attrs.src}
            width={node.attrs.width}
            height={node.attrs.height}
          />
        )}

        {mediaType === "video" && (
          <video
            ref={resizableImgRef as any}
            className={`${styles.media_box}`}
            controls
            width={node.attrs.width}
            height={node.attrs.height}
          >
            <source src={node.attrs.src} />
          </video>
        )}

        <div
          className={`${styles.horizontal_resize_handle}`}
          title="Resize"
          onClick={({ clientX }) => setLastClientX(clientX)}
          onMouseDown={startHorizontalResize}
          onMouseUp={stopHorizontalResize}
        />

        <section className={`${styles.media_control_buttons} ${styles.group}`}>
          {resizableMediaActions.map((btn) => {
            return (
              <button
                key={btn.tooltip}
                type="button"
                className={`${styles.btn} ${
                  mediaActionActiveState[btn.tooltip] ? "active" : ""
                }`}
                onClick={() =>
                  btn.tooltip === "Delete"
                    ? deleteNode()
                    : btn.action?.(updateAttributes)
                }
              >
                <Icon icon={`${btn.icon}`} />
              </button>
            );
          })}
        </section>
      </div>
    </NodeViewWrapper>
  );
};
