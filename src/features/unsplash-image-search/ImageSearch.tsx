import React, { useContext, useEffect, useState } from "react";
import styles from "./imageSearch.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { usePageData } from "../../services/usePageData";
import { PageState, setPage } from "../../slice/pageSlice";

const ImageSearch = () => {
  const { theme } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [searchImages, setSearchImages] = useState<any>();
  const pageInfo = useAppSelector((state) => state.page.pageInfo);
  const { mutate: mutateUpdatePageCover } = usePageData.useUpdatePageCover();
  const dispatch = useDispatch();

  const handleImageSelect = (img: string) => {
    const pageData = {
      pageId: pageInfo!.id,
      url: img,
      verticalPosition: 0,
    };

    mutateUpdatePageCover(pageData, {
      onSuccess: async () => {
        const updatedPage: PageState = {
          ...pageInfo!,
          coverPicture: {
            ...pageInfo!.coverPicture,
            url: img,
          },
        };

        dispatch(setPage(updatedPage));
      },
    });
  };

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error while fetching images from Unsplash");
        }
      })
      .then((data) => {
        const images = data.results;
        setSearchImages(images);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  return (
    <>
      <div className={`${styles.container} ${styles[theme]}`}>
        <input
          id="email"
          type="text"
          value={query}
          placeholder="Search for an image..."
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          autoComplete="off"
        />
        {searchImages && searchImages.length === 0 ? (
          <p>No result found.</p>
        ) : (
          <div className={`${styles.result_display}`}>
            <div className={`${styles.collection}`}>
              {searchImages?.map(
                (data: any, index: React.Key | null | undefined) => (
                  <div
                    className={`${styles.display}`}
                    key={index}
                    onClick={() => handleImageSelect(data.urls.regular)}
                  >
                    <img src={data.urls.small} alt={`${data.description}`} />
                    <p>
                      by <a href={data.user.portfolio_url}>{data.user.name}</a>
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageSearch;
