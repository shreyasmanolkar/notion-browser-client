import React, { createContext, useState, MouseEvent } from "react";

export const SidebarLogicContext = createContext<any>({
  leftOpen: true,
  rightOpen: false,
  rightPanelContent: null,
  toggleSidebar: undefined,
});

export const SidebarLogicProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [leftOpen, setLeftOpen] = useState<boolean>(true);
  const [rightOpen, setRightOpen] = useState<boolean>(false);
  const [rightPanelContent, setRightPanelContent] = useState<string | null>(
    null
  );

  const toggleSidebar = (event: MouseEvent) => {
    const targetId = event.currentTarget.id;
    const parentNode = event.currentTarget.parentNode as HTMLElement;

    if (parentNode) {
      const key = `${parentNode.id}_open`;

      if (key === "left_header_open" || key === "menu_icon_open") {
        setLeftOpen(!leftOpen);
      } else if (key === "right_header_open" || key === "options_open") {
        if (targetId === "history") {
          !rightOpen && setRightOpen(true);

          setRightPanelContent("history");
        } else if (targetId === "comment") {
          !rightOpen && setRightOpen(true);

          setRightPanelContent("comment");
        } else {
          setRightOpen(false);
        }
      }
    }
  };

  return (
    <SidebarLogicContext.Provider
      value={{ leftOpen, rightOpen, rightPanelContent, toggleSidebar }}
    >
      {children}
    </SidebarLogicContext.Provider>
  );
};
