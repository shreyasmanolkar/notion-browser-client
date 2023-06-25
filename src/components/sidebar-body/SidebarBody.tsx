import React from "react";
import OptionsPanel from "../options-panel";
import PagesDisplayList from "../pages-display-list";
import SidebarFooter from "../sidebar-footer";

const SidebarBody = () => {
  return (
    <div>
      <OptionsPanel />
      <PagesDisplayList />
      <SidebarFooter />
    </div>
  );
};

export default SidebarBody;
