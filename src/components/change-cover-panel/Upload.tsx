import React, { useContext } from "react";
import styles from "./upload.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

const Upload = () => {
  const { theme } = useContext(ThemeContext);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("file", e.target.files?.[0]);
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <label htmlFor="file-upload" className={`${styles.file_upload}`}>
        Upload file
      </label>
      <input id="file-upload" type="file" onChange={handleFileUpload} />
      <p>Images wider that 1500 pixels work best.</p>
      <p>The maximum size per file is 5MB.</p>
    </div>
  );
};

export default Upload;
