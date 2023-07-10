import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { NewPageContext } from "../../../context/NewPageContext";
import styles from "../../change-cover-panel/coverLink.module.scss";

const CoverLinkNewPagePanel = () => {
  const { theme } = useContext(ThemeContext);
  const { setCoverPicture } = useContext(NewPageContext);
  const [coverLink, setCoverLink] = useState("");

  const handleCoverLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCoverLink(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const coverPictureData = {
      url: coverLink,
      verticalPosition: 0,
    };

    setCoverPicture(coverPictureData);
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="text"
          value={coverLink}
          placeholder="Paste an image link..."
          onChange={handleCoverLinkChange}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
      <p>Works with any image from the web.</p>
    </div>
  );
};

export default CoverLinkNewPagePanel;
