import React, { useContext, useEffect, useState } from "react";
import styles from "./imageSearch.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { NewPageContext } from "../../context/NewPageContext";

const ImageSearchNewPagePanel = () => {
  const { theme } = useContext(ThemeContext);
  const { setCoverPicture } = useContext(NewPageContext);
  const [query, setQuery] = useState("");
  const [searchImages, setSearchImages] = useState<any>();

  const handleImageSelect = (img: string) => {
    const coverPictureData = {
      url: img,
      verticalPosition: 0,
    };

    setCoverPicture(coverPictureData);
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

export default ImageSearchNewPagePanel;
