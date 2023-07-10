import React, { useContext } from "react";
import styles from "../../change-cover-panel/upload.module.scss";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { v4 } from "uuid";
import { ThemeContext } from "../../../context/ThemeContext";
import { NewPageContext } from "../../../context/NewPageContext";

const UploadNewPagePanel = () => {
  const { theme } = useContext(ThemeContext);
  const { setCoverPicture } = useContext(NewPageContext);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage === null) return;

    const imageRef = ref(storage, `images/${selectedImage?.name + v4()}`);

    uploadBytes(imageRef, selectedImage!).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const coverPictureData = {
          url,
          verticalPosition: 0,
        };

        setCoverPicture(coverPictureData);
      });
    });
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

export default UploadNewPagePanel;
