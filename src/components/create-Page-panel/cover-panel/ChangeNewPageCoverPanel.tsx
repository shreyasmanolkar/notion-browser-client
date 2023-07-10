import React, { useContext, useState } from "react";
import { ReactComponent as UnsplashIcon } from "../../../assets/icons/unsplash-logo.svg";
import styles from "../../change-cover-panel/changeCover.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { NewPageContext } from "../../../context/NewPageContext";
import GalleryNewPagePanel from "./GalleryNewPagePanel";
import UploadNewPagePanel from "./UploadNewPagePanel";
import CoverLinkNewPagePanel from "./CoverLinkNewPagePanel";
import UnsplashNewPagePanel from "./UnsplashNewPagePanel";

type ChangeCoverProps = {
  open: boolean;
  onClose: () => void;
};

const ChangeNewPageCoverPanel: React.FC<ChangeCoverProps> = ({
  open,
  onClose,
}) => {
  const { theme } = useContext(ThemeContext);
  const { setCoverPicture } = useContext(NewPageContext);
  const [activeTab, setActiveTab] = useState("gallery");

  if (!open) return null;

  const handleRemove = () => {
    const coverPictureData = {
      url: "",
      verticalPosition: 0,
    };

    setCoverPicture(coverPictureData);
  };

  return (
    <>
      <div
        className={`${styles.change_cover_background} ${styles[theme]}`}
        onClick={onClose}
      >
        <div
          className={`${styles.change_cover}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${styles.header}`}>
            <div className={`${styles.left_header}`}>
              <div
                className={`${styles.tab} ${
                  activeTab === "gallery" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("gallery")}
              >
                <p>Gallery</p>
              </div>
              <div
                className={`${styles.tab} ${
                  activeTab === "upload" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("upload")}
              >
                <p>Upload</p>
              </div>
              <div
                className={`${styles.tab} ${
                  activeTab === "link" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("link")}
              >
                <p>Link</p>
              </div>
              <div
                className={`${styles.tab} ${
                  activeTab === "unsplash" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("unsplash")}
              >
                <p className={`${styles.unsplash}`}>
                  <UnsplashIcon />
                  Unsplash
                </p>
              </div>
            </div>
            <div className={`${styles.right_header}`}>
              <div className={`${styles.tab} `} onClick={handleRemove}>
                <p>Remove</p>
              </div>
            </div>
          </div>
          <div className={`${styles.body}`}>
            {(() => {
              if (activeTab === "gallery") {
                /* prettier-ignore */
                return <GalleryNewPagePanel />
              } else if (activeTab === "upload") {
                /* prettier-ignore */
                return <UploadNewPagePanel />
              } else if (activeTab === "link") {
                /* prettier-ignore */
                return <CoverLinkNewPagePanel />
              } else {
                /* prettier-ignore */
                return <UnsplashNewPagePanel />
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeNewPageCoverPanel;
