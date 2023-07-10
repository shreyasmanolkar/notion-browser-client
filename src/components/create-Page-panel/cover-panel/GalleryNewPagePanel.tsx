import { useContext } from "react";
import styles from "../../change-cover-panel/gallery.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { NewPageContext } from "../../../context/NewPageContext";
import { colorAndGradients } from "../../../data/colorAndGradients";
import { jamesWebbTelescope } from "../../../data/jamesWebbTelescope";
import { nasaArchive } from "../../../data/nasaArchive";
import { indianEdition } from "../../../data/indianEdition";
import { patterns } from "../../../data/patterns";
import { rijskMuseum } from "../../../data/rijksMuseum";
import { japanesePrint } from "../../../data/japanesePrint";
import { metMuseum } from "../../../data/metMuseum";

const GalleryNewPagePanel = () => {
  const { theme } = useContext(ThemeContext);
  const { setCoverPicture } = useContext(NewPageContext);

  const handleImageSelect = (img: string) => {
    const coverPictureData = {
      url: img,
      verticalPosition: 0,
    };

    setCoverPicture(coverPictureData);
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a href="https://images.superfamous.com/36-Gradients" target="blank">
            COLOR & GRADIENT
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {colorAndGradients.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`color-${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a href="https://webbtelescope.org" target="blank">
            JAMES WEBB TELESCOPE
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {jamesWebbTelescope.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`jwt-${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a href="https://www.flickr.com/photos/nasacommons/" target="blank">
            NASA ARCHIVE
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {nasaArchive.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`nasa-${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a href="https://www.artisera.com/pages/fine-art" target="blank">
            THE INDIAN EDITION
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {indianEdition.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`bharat-${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a href="https://www.metmuseum.org/art/the-collection" target="blank">
            THE MET MUSEUM - PATTERNS
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {patterns.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`pattern-${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a
            href="https://www.rijksmuseum.nl/en/rijksstudio?ii=0&p=0&from=2023-07-02T23%3A55%3A33.8008630Z"
            target="blank"
          >
            RIJKSMUSEUM
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {rijskMuseum.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`rijks-${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a href="https://www.metmuseum.org/art/the-collection" target="blank">
            THE MET MUSEUM - JAPANESE PRINTS
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {japanesePrint.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`japan-${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <a href="https://www.metmuseum.org/art/the-collection" target="blank">
            THE MET MUSEUM
          </a>
        </div>
        <div className={`${styles.collection}`}>
          {metMuseum.map((item, index) => (
            <div
              className={`${styles.display}`}
              key={index}
              onClick={() => handleImageSelect(item)}
            >
              <img src={item} alt={`met-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryNewPagePanel;
