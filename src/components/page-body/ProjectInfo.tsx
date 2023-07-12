import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import websiteImg from "../../assets/images/profile/website.jpg";
import githubImg from "../../assets/images/profile/github.jpg";
import twitterImg from "../../assets/images/profile/twitter.jpg";
import linkedInImg from "../../assets/images/profile/linkedin.jpg";
import cvImg from "../../assets/images/profile/cv.jpg";
import styles from "./projectInfo.module.scss";

type ProjectInfoProps = {
  open: boolean;
  onClose: () => void;
};

const ProjectInfo: React.FC<ProjectInfoProps> = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext);

  if (!open) return null;

  return (
    <>
      <div
        className={`${styles.project_info_background} ${styles[theme]}`}
        onClick={onClose}
      >
        <div
          className={`${styles.project_info}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${styles.title}`}>Engineer profile</div>
          <a
            href="https://shreyasmanolkar.com"
            target="blank"
            className={`${styles.tab}`}
          >
            <div className={`${styles.img}`}>
              <img src={websiteImg} alt="website" />
            </div>
            <div className={`${styles.info}`}>Shreyas Manolkar</div>
          </a>
          <a
            href="https://github.com/shreyasmanolkar"
            target="blank"
            className={`${styles.tab}`}
          >
            <div className={`${styles.img}`}>
              <img src={githubImg} alt="github" />
            </div>
            <div className={`${styles.info}`}>Git Hub</div>
          </a>
          <a
            href="https://twitter.com/ShreyasManolkar"
            target="blank"
            className={`${styles.tab}`}
          >
            <div className={`${styles.img}`}>
              <img src={twitterImg} alt="twitter" />
            </div>
            <div className={`${styles.info}`}>Twitter</div>
          </a>
          <a
            href="https://www.linkedin.com/in/shreyas-manolkar/"
            target="blank"
            className={`${styles.tab}`}
          >
            <div className={`${styles.img}`}>
              <img src={linkedInImg} alt="linkedIn" />
            </div>
            <div className={`${styles.info}`}>LinkedIn</div>
          </a>
          {/* TODO: update resume */}
          <a
            href="https://shreyasmanolkar.com/assets/Resume2.1.pdf"
            target="blank"
            className={`${styles.tab}`}
          >
            <div className={`${styles.img}`}>
              <img src={cvImg} alt="Curriculum vitae" />
            </div>
            <div className={`${styles.info}`}>Curriculum Vitae</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
