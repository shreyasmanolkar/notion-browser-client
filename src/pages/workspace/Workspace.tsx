import styles from "./workspace.module.scss";
import LeftSidebar from "../../layouts/left-sidebar";
import PageDisplay from "../../layouts/page-display";
import RightSidebar from "../../layouts/right-sidebar";
import { SidebarLogicProvider } from "../../context/SidebarContext";

const Workspace = () => {
  return (
    <SidebarLogicProvider>
      <div className={`${styles.layout}`} data-testid="workspace">
        <LeftSidebar />
        <PageDisplay />
        <RightSidebar />
      </div>
    </SidebarLogicProvider>
  );
};

export default Workspace;
