import React, { useContext } from "react";
import styles from "./upload.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { v4 } from "uuid";
import { useAppSelector } from "../../app/hooks";
import { PageState, setPage } from "../../slice/pageSlice";
import { usePageData } from "../../services/usePageData";
import { useDispatch } from "react-redux";

const Upload = () => {
  const { theme } = useContext(ThemeContext);
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const { mutate: mutateUpdatePageCover } = usePageData.useUpdatePageCover();
  const dispatch = useDispatch();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage === null) return;

    const imageRef = ref(storage, `images/${selectedImage?.name + v4()}`);

    uploadBytes(imageRef, selectedImage!).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const pageData = {
          pageId: pageInfo!.id,
          url,
          verticalPosition: 0,
        };

        mutateUpdatePageCover(pageData, {
          onSuccess: async () => {
            const updatedPage: PageState = {
              ...pageInfo!,
              coverPicture: {
                ...pageInfo!.coverPicture,
                url,
              },
            };

            dispatch(setPage(updatedPage));
          },
        });
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

export default Upload;
