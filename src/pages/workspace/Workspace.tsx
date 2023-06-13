import styles from "./workspace.module.scss";

const Workspace = () => {
  return (
    <div id={`${styles.layout}`}>
      {/* left sidebar */}

      <div id={`${styles.left}`}>
        <div className={`${styles.sidebar}`}>
          <div className={`${styles.header}`}>
            <div className={`${styles.title_container}`}>
              <p>Workspace</p>
            </div>
            <div className={`${styles.icon}`}>&#171;</div>
          </div>
          <div className={`${styles.content}`}></div>
        </div>
      </div>

      {/* main */}

      <div id={`${styles.main}`}>
        <div className={`${styles.header}`}>
          <div id={`${styles.path}`}>
            <div className={`${styles.on_menu_icon}`}>&equiv;</div>
            <h3>Page Title</h3>
          </div>
          <div className={`${styles.main_options}`}>
            <p>Edited At</p>
            <p>Share</p>
            <p>Comment</p>
            <p>History</p>
            <p className={`${styles.comments}`}>&#9733;</p>
            <p>options</p>
          </div>
        </div>
        <div className={`${styles.content}`}>
          <div className={`${styles.cover}`}></div>
          <div className={`${styles.page_content}`}></div>
        </div>
      </div>

      {/* right sidebar */}

      <div id={`${styles.right}`}>
        <div className={`${styles.sidebar}`}>
          <div className={`${styles.header}`}>
            <div className={`${styles.icon}`}>&#187;</div>
          </div>
          <div className={`${styles.content}`}>
            <p>comment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
