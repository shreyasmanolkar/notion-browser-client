/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import styles from "./pageOptions.module.scss";
import { ReactComponent as LoopIcon } from "../../assets/icons/loop.svg";
import { ReactComponent as MoveToIcon } from "../../assets/icons/move-to.svg";
import { ReactComponent as CustomizeIcon } from "../../assets/icons/customize.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import { ReactComponent as UnlockIcon } from "../../assets/icons/unlock.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import { ReactComponent as RemoveStarIcon } from "../../assets/icons/remove-star.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg";
import { ReactComponent as DuplicateIcon } from "../../assets/icons/duplicate.svg";
import { ReactComponent as UndoIcon } from "../../assets/icons/undo.svg";
import { ReactComponent as PageHistortyIcon } from "../../assets/icons/page-history.svg";
import { ReactComponent as PageAnalyticsIcon } from "../../assets/icons/page-analytics.svg";
import { ReactComponent as ShowDeletedPagesIcon } from "../../assets/icons/show-deleted-pages.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as ImportIcon } from "../../assets/icons/import.svg";
import { ReactComponent as ExportIcon } from "../../assets/icons/export.svg";
import { ThemeContext } from "../../context/ThemeContext";
import {
  updatePageSettingsData,
  usePageData,
} from "../../services/usePageData";
import { useAppSelector } from "../../app/hooks";
import { PageType } from "../../common/types/Page";
import { useDispatch } from "react-redux";
import { setPage } from "../../slice/pageSlice";
import { request } from "../../lib/axios";
import { setWorkspace } from "../../slice/workspaceSlice";
import { useQueryClient } from "react-query";

type PageOptionsProps = {
  open: boolean;
  onClose: () => void;
  favorite: boolean;
  onFavoriteClick: () => void;
};

type FavoritePageType = {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
  title: string;
  createdAt: Date;
};

const PageOptions: React.FC<PageOptionsProps> = ({
  open,
  onClose,
  favorite,
  onFavoriteClick,
}) => {
  const { theme } = useContext(ThemeContext);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const workspaceInfo = useAppSelector(
    (state) => state.workspace.workspaceInfo
  );
  const selectedFont = pageInfo?.pageSettings.font;
  const [activeFont, setActiveFont] = useState(selectedFont);
  const isSmallText = pageInfo?.pageSettings.smallText;
  const [smallTextChecked, setSmallTextChecked] = useState(isSmallText);
  const isFullWidth = pageInfo?.pageSettings.fullWidth;
  const [fullWidthChecked, setFullWidthChecked] = useState(isFullWidth);
  const isLock = pageInfo?.pageSettings.lock;
  const [lock, setLock] = useState(isLock);
  const { mutate: mutateUpdatePageSettings } =
    usePageData.useUpdatePageSettings();
  const { mutate: mutateDeletePage } = usePageData.useDeletePageData();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleOnLockClick = () => {
    setLock(!lock);
  };

  const handleFontChange = (font: string) => {
    setActiveFont(font);
  };

  const handleSmallTextCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSmallTextChecked(event.target.checked);
  };

  const handleFullWidthCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFullWidthChecked(event.target.checked);
  };

  useEffect(() => {
    setSmallTextChecked(isSmallText);
  }, [isSmallText]);

  useEffect(() => {
    setActiveFont(selectedFont);
  }, [selectedFont]);

  useEffect(() => {
    setFullWidthChecked(isFullWidth);
  }, [isFullWidth]);

  useEffect(() => {
    const pageSettingsData: updatePageSettingsData = {
      pageId: pageInfo?.id!,
      settings: {
        ...pageInfo?.pageSettings!,
      },
    };

    if (smallTextChecked) {
      pageSettingsData.settings.smallText = smallTextChecked;
    } else {
      pageSettingsData.settings.smallText = smallTextChecked!;
    }

    mutateUpdatePageSettings(pageSettingsData, {
      onSuccess: async () => {
        const updatedPage: PageType = {
          ...pageInfo!,
          pageSettings: {
            ...pageInfo?.pageSettings!,
            smallText: smallTextChecked!,
          },
        };

        dispatch(setPage(updatedPage));
      },
    });
  }, [smallTextChecked]);

  useEffect(() => {
    const pageSettingsData: updatePageSettingsData = {
      pageId: pageInfo?.id!,
      settings: {
        ...pageInfo?.pageSettings!,
      },
    };

    if (fullWidthChecked) {
      pageSettingsData.settings.fullWidth = fullWidthChecked;
    } else {
      pageSettingsData.settings.fullWidth = fullWidthChecked!;
    }

    mutateUpdatePageSettings(pageSettingsData, {
      onSuccess: async () => {
        const updatedPage: PageType = {
          ...pageInfo!,
          pageSettings: {
            ...pageInfo?.pageSettings!,
            fullWidth: fullWidthChecked!,
          },
        };

        dispatch(setPage(updatedPage));
      },
    });
  }, [fullWidthChecked]);

  useEffect(() => {
    const pageSettingsData: updatePageSettingsData = {
      pageId: pageInfo?.id!,
      settings: {
        ...pageInfo?.pageSettings!,
      },
    };

    if (lock) {
      pageSettingsData.settings.lock = lock;
    } else {
      pageSettingsData.settings.lock = lock!;
    }

    mutateUpdatePageSettings(pageSettingsData, {
      onSuccess: async () => {
        const updatedPage: PageType = {
          ...pageInfo!,
          pageSettings: {
            ...pageInfo?.pageSettings!,
            lock: lock!,
          },
        };

        dispatch(setPage(updatedPage));
      },
    });
  }, [lock]);

  useEffect(() => {
    const pageSettingsData: updatePageSettingsData = {
      pageId: pageInfo?.id!,
      settings: {
        ...pageInfo?.pageSettings!,
      },
    };

    if (activeFont === "san-serif") {
      pageSettingsData.settings.font = activeFont;
    } else if (activeFont === "serif") {
      pageSettingsData.settings.font = activeFont;
    } else if (activeFont === "mono") {
      pageSettingsData.settings.font = activeFont;
    }

    mutateUpdatePageSettings(pageSettingsData, {
      onSuccess: async () => {
        const updatedPage: PageType = {
          ...pageInfo!,
          pageSettings: {
            ...pageInfo?.pageSettings!,
            font: activeFont!,
          },
        };

        dispatch(setPage(updatedPage));
      },
    });
  }, [activeFont]);

  const handleDelete = async () => {
    const pages = workspaceInfo?.pages;
    const pageData = { pageId: pageInfo?.id! };

    if (pages?.length! === 1) {
      window.alert("The last page cannot be deleted");
      return;
    }

    const currentPageReference = pageInfo?.reference;

    const childPages = pages?.filter(
      (page) => page.path === `,${currentPageReference}.`
    );

    if (childPages?.length !== 0) {
      window.alert(
        "This page can't be deleted because it contains child pages."
      );
      return;
    }

    const filteredPages = pages?.filter((page) => page.id !== pageData.pageId);

    if (filteredPages && filteredPages.length > 0) {
      const alternatePageId = filteredPages[0];

      mutateDeletePage(pageData, {
        onSuccess: async () => {
          const page = await request({
            url: `/pages/${alternatePageId.id}`,
          });

          const workspace = await request({
            url: `/workspaces/${workspaceInfo?.id}`,
          });

          if (pageInfo?.path !== null) {
            queryClient.invalidateQueries(["child-pages", page.data.id]);
          }

          dispatch(setPage({ ...page.data }));
          dispatch(setWorkspace({ ...workspace.data }));

          const savedState = localStorage.getItem("pagesListState");
          const parsedSavedState: {
            id: string;
            reference: string;
            path: string | null;
            icon: string;
            title: string;
            createdAt: Date;
          }[] = JSON.parse(savedState!);

          const updatedPages = parsedSavedState.filter(
            (page) => page.id !== pageData.pageId
          );

          localStorage.setItem("pagesListState", JSON.stringify(updatedPages));

          const savedFavoriteState = localStorage.getItem(
            "favoritePagesListState"
          );
          const parsedSavedFavoriteState: FavoritePageType[] =
            savedFavoriteState === undefined
              ? JSON.parse(savedFavoriteState!)
              : [];

          const updatedSavedState =
            parsedSavedFavoriteState &&
            parsedSavedFavoriteState.filter(
              (page) => page.id !== pageData.pageId
            );

          if (updatedSavedState && updatedSavedState.length === 0) {
            localStorage.setItem("favoritePagesListState", JSON.stringify([]));
          } else {
            localStorage.setItem(
              "favoritePagesListState",
              JSON.stringify(updatedSavedState)
            );
          }
        },
      });
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className={`${styles.page_options_background} ${styles[theme]}`}
        onClick={onClose}
      >
        <div
          className={`${styles.page_options}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${styles.style_container}`}>
            <p className={`${styles.style}`}>Style</p>
            <div className={`${styles.fonts}`}>
              <div
                className={`${styles.default}  ${
                  activeFont === "san-serif" ? styles.active : ""
                }`}
                onClick={() => handleFontChange("san-serif")}
              >
                <h2>Ag</h2>
                <p>Default</p>
              </div>
              <div
                className={`${styles.serif} ${
                  activeFont === "serif" ? styles.active : ""
                }`}
                onClick={() => handleFontChange("serif")}
              >
                <h2>Ag</h2>
                <p>Serif</p>
              </div>
              <div
                className={`${styles.mono} ${
                  activeFont === "mono" ? styles.active : ""
                }`}
                onClick={() => handleFontChange("mono")}
              >
                <h2>Ag</h2>
                <p>Mono</p>
              </div>
            </div>
          </div>
          <div className={`${styles.text}`}>
            <div className={`${styles.value_control}`}>
              <div className={`${styles.key}`}>
                <p>Small text</p>
              </div>
              <div className={`${styles.control}`}>
                <label className={`${styles.switch}`}>
                  <input
                    type="checkbox"
                    checked={smallTextChecked}
                    onChange={handleSmallTextCheckboxChange}
                  />
                  <span className={`${styles.slider_round}`}></span>
                </label>
              </div>
            </div>
            <div className={`${styles.value_control}`}>
              <div className={`${styles.key}`}>
                <p>Full width</p>
              </div>
              <div className={`${styles.control}`}>
                <label className={`${styles.switch}`}>
                  <input
                    type="checkbox"
                    checked={fullWidthChecked}
                    onChange={handleFullWidthCheckboxChange}
                  />
                  <span className={`${styles.slider_round}`}></span>
                </label>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <LoopIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Turn into wiki</p>
                <p>Organize by owner, tags, verification, and more</p>
              </div>
              <div className={`${styles.new_button}`}>
                <p>new</p>
              </div>
            </div>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <MoveToIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Move To</p>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <CustomizeIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Customize page</p>
              </div>
            </div>
            <div className={`${styles.tab}`} onClick={handleOnLockClick}>
              <div className={`${styles.icon}`}>
                {pageInfo?.pageSettings.lock ? <UnlockIcon /> : <LockIcon />}
              </div>
              <div className={`${styles.title}`}>
                {pageInfo?.pageSettings.lock ? (
                  <p>Unlock page</p>
                ) : (
                  <p>Lock page</p>
                )}
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab}`} onClick={onFavoriteClick}>
              <div className={`${styles.icon}`}>
                {favorite ? <RemoveStarIcon /> : <StarIcon />}
              </div>
              <div className={`${styles.title}`}>
                {favorite ? (
                  <p>Remove from Favorites</p>
                ) : (
                  <p>Add to Favorites</p>
                )}
              </div>
            </div>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <LinkIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Copy link</p>
              </div>
            </div>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <DuplicateIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Duplicate</p>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <UndoIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Undo</p>
              </div>
            </div>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <PageHistortyIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Page history</p>
              </div>
            </div>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <PageAnalyticsIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Page analytics</p>
              </div>
            </div>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <ShowDeletedPagesIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Show deleted pages</p>
              </div>
            </div>
            <div className={`${styles.tab}`} onClick={handleDelete}>
              <div className={`${styles.icon}`}>
                <DeleteIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Delete</p>
              </div>
            </div>
          </div>
          <div className={`${styles.wiki}`}>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <ImportIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Import</p>
              </div>
            </div>
            <div className={`${styles.tab} ${styles.not_allowed}`}>
              <div className={`${styles.icon}`}>
                <ExportIcon />
              </div>
              <div className={`${styles.title}`}>
                <p>Export</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageOptions;
