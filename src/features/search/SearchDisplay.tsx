import React, { useContext, useEffect, useState } from "react";
import twemoji from "twemoji";
import getFormattedTimeDifference from "../../utils/getFormatedTimeDifference";
import { PageType } from "../../common/types/Workspace";
import { ThemeContext } from "../../context/ThemeContext";
import moment from "moment";
import styles from "./searchDisplay.module.scss";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setPage } from "../../slice/pageSlice";
import { NavLink } from "react-router-dom";

type SearchDisplayProps = {
  data: PageType[];
  onClose: () => void;
};

const SearchDisplay: React.FC<SearchDisplayProps> = ({ data, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState(moment());
  const dispatch = useDispatch();

  const getEmojiUrl = (unified: string) => {
    const emojiImage = twemoji.parse(
      `https://twemoji.maxcdn.com/v/latest/72x72/${unified}.png`
    );

    return emojiImage;
  };

  const handleBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6.png";
    e.currentTarget.onerror = null;
  };

  const formatedTime = (createdAt: Date) => {
    const time = getFormattedTimeDifference(createdAt, currentTime);
    return time;
  };

  const handleOnClick = async (id: string) => {
    const page = await request({
      url: `/pages/${id}`,
    });

    dispatch(setPage({ ...page.data }));
    onClose();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={`${styles.search_display_container} ${styles[theme]}`}>
        {data.length < 1 ? (
          <div className={`${styles.no_content}`}>
            <div className={`${styles.container}`}>
              <p>No result</p>
              <br />
              <p>
                But the Good news is, you found a highly skilled{" "}
                <a
                  href="https://www.linkedin.com/in/shreyas-manolkar/"
                  target="blank"
                >
                  individual
                </a>{" "}
                looking for a job!
              </p>
            </div>
          </div>
        ) : (
          data.map((item, index) => (
            <NavLink
              to={`${item.reference}`}
              className={`${styles.nav_link}`}
              key={index}
            >
              <div
                className={`${styles.display_tab}`}
                onClick={() => handleOnClick(item.id)}
              >
                <div className={`${styles.info_container}`}>
                  <div className={`${styles.emoji}`}>
                    <img
                      src={getEmojiUrl(item.icon)}
                      onError={(e) => handleBrokenImage(e)}
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <div className={`${styles.title}`}>{item.title}</div>
                </div>
                <div className={`${styles.time}`}>
                  {formatedTime(item.createdAt)}
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </>
  );
};

export default SearchDisplay;
