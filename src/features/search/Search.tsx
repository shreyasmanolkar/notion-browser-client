import React, { useContext, useState } from "react";
import styles from "./search.module.scss";
import { useAppSelector } from "../../app/hooks";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as DocumentIcon } from "../../assets/icons/document.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { ReactComponent as DownIcon } from "../../assets/icons/down-expand.svg";
import { ReactComponent as TitleIcon } from "../../assets/icons/title.svg";
import { ReactComponent as PersonIcon } from "../../assets/icons/person.svg";
import { ReactComponent as OpenTeamspaceIcon } from "../../assets/icons/open-teamspace.svg";
import { ReactComponent as PageIcon } from "../../assets/icons/page.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ThemeContext } from "../../context/ThemeContext";
import SortPanel from "./SortPanel";
import SearchDisplay from "./SearchDisplay";
import { PageType } from "../../common/types/Workspace";

type SearchPanelProps = {
  open: boolean;
  onClose: () => void;
};

const SearchPanel: React.FC<SearchPanelProps> = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [query, setQuery] = useState("");
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("Sort");
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );

  const keys = ["title"];

  const search = (data: PageType[]) => {
    const filteredData = data.filter((item) =>
      keys.some((key) => (item as any)[key].toLowerCase().includes(query))
    );

    if (sortOption === "Created: Newest first") {
      const sortedNewestFirst = filteredData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return sortedNewestFirst;
    } else if (sortOption === "Created: Oldest first") {
      const sortedOldestFirst = filteredData.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      return sortedOldestFirst;
    } else {
      return filteredData;
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className={`${styles.search_panel_background} ${styles[theme]}`}
        onClick={onClose}
      >
        <div
          className={`${styles.search_panel}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${styles.search_bar_section}`}>
            <div className={`${styles.icon}`}>
              {query === "" ? <SearchIcon /> : <DocumentIcon />}
            </div>
            <input
              type="search"
              name="search_bar"
              id="search_bar"
              autoComplete="off"
              spellCheck="false"
              value={query}
              placeholder={`Search ${userInfo?.name}...`}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query !== "" ? (
              <div className={`${styles.cancel}`} onClick={() => setQuery("")}>
                <CrossIcon />
              </div>
            ) : null}
          </div>
          <div className={`${styles.search_options}`}>
            <div
              className={`${styles.tab}`}
              onClick={() => {
                setOpenSort(true);
              }}
            >
              <div className={`${styles.icon}`}>
                <SortIcon />
              </div>
              <div className={`${styles.wrap_container}`}>
                <p>{sortOption}</p>
              </div>
              <div className={`${styles.down_icon}`}>
                <DownIcon />
              </div>
            </div>
            <div className={`${styles.tab} ${styles.active} ${styles.invalid}`}>
              <div className={`${styles.icon}`}>
                <TitleIcon />
              </div>
              <div className={`${styles.wrap_container}`}>
                <p>Title only</p>
              </div>
              <div className={`${styles.icon}`}></div>
            </div>
            <div className={`${styles.tab} ${styles.active} ${styles.invalid}`}>
              <div className={`${styles.icon}`}>
                <PersonIcon />
              </div>
              <div className={`${styles.wrap_container}`}>
                <p>Created by: {userInfo?.name}</p>
              </div>
              <div className={`${styles.down_icon}`}>
                <DownIcon />
              </div>
            </div>
            <div className={`${styles.tab} ${styles.invalid}`}>
              <div className={`${styles.icon}`}>
                <OpenTeamspaceIcon />
              </div>
              <div className={`${styles.wrap_container}`}>
                <p>Teamspace</p>
              </div>
              <div className={`${styles.down_icon}`}>
                <DownIcon />
              </div>
            </div>
            <div className={`${styles.tab} ${styles.invalid}`}>
              <div className={`${styles.icon}`}>
                <PageIcon />
              </div>
              <div className={`${styles.wrap_container}`}>
                <p>In</p>
              </div>
              <div className={`${styles.down_icon}`}>
                <DownIcon />
              </div>
            </div>
            <div className={`${styles.tab} ${styles.invalid}`}>
              <div className={`${styles.icon}`}>
                <CalendarIcon />
              </div>
              <div className={`${styles.wrap_container}`}>
                <p>Date</p>
              </div>
              <div className={`${styles.down_icon}`}>
                <DownIcon />
              </div>
            </div>
          </div>
          {/* search result */}
          <SearchDisplay
            data={search(workspaceInfo?.pages!)}
            onClose={onClose}
          />
        </div>
      </div>
      <SortPanel
        open={openSort}
        onClose={() => setOpenSort(false)}
        setSortOption={setSortOption}
      />
    </>
  );
};

export default SearchPanel;
