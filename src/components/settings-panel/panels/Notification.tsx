import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { useThemeDetector } from "../../../hooks/useThemeDetector";
import styles from "./account.module.scss";
import { useUserData } from "../../../services/useUserData";
import { useAppSelector } from "../../../app/hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slice/userSlice";

const Notification = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [mode, setMode] = useState("");
  const { mutate: mutateIsDarkMode } = useUserData.useUpdateIsDarkModeData();
  const dispatch = useDispatch();

  const isDarkMode = useThemeDetector();

  useEffect(() => {
    if (mode !== "") {
      localStorage.setItem("selectedMode", mode);
    }
  }, [mode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("selectedMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode("system");
    }
  }, []);

  const handleAppearance = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;

    if (mode === "system") {
      setMode("system");
      isDarkMode ? setTheme("dark") : setTheme("light");
    } else if (mode === "dark") {
      const userData = {
        isDarkMode: true,
        userId: userInfo?.id!,
      };

      setMode("dark");
      setTheme("dark");
      mutateIsDarkMode(userData, {
        onSuccess: async (data) => {
          if (data) {
            const updatedIsDarkMode = data.isDarkMode;

            const updatedUser = {
              ...userInfo!,
              isDarkMode: updatedIsDarkMode,
            };

            dispatch(setUser(updatedUser));
          }
        },
      });
    } else {
      const userData = {
        isDarkMode: false,
        userId: userInfo?.id!,
      };

      setMode("light");
      setTheme("light");
      mutateIsDarkMode(userData, {
        onSuccess: async (data) => {
          if (data) {
            const updatedIsDarkMode = data.isDarkMode;

            const updatedUser = {
              ...userInfo!,
              isDarkMode: updatedIsDarkMode,
            };

            dispatch(setUser(updatedUser));
          }
        },
      });
    }
  };

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <div>
        <div className={`${styles.title}`}>My notifications</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Mobile push notifications</p>
              <p>
                Receive push notifications on mentions and comments via your
                mobile app
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.switch}`}>
                <input type="checkbox" disabled />
                <span className={`${styles.slider_round}`}></span>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Email notifications</p>
              <p>
                Receive email updates, including mentions and comment replies
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.switch}`}>
                <input type="checkbox" disabled />
                <span className={`${styles.slider_round}`}></span>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Slack notifications</p>
              <p>
                Receive notifications in your Slack workspace when you're
                mentioned in a page, database property, or comment
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="slack_notification" id="slack" disabled>
                  <option value="off">Off</option>
                  <option value="on">On</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>My settings</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Appearance</p>
              <p>Customize how Notion looks on your device.</p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select} ${styles.valid}`}>
                <select
                  name="appearance"
                  id="appearance"
                  value={mode}
                  onChange={handleAppearance}
                >
                  <option value="system">System</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Open on start</p>
              <p>
                Choose what to show when Notion starts or when you switch
                workspaces.
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="open_on_start" id="open_on_start" disabled>
                  <option value="system">Last</option>
                  <option value="off">Top</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.title}`}>Privacy</div>
        <div className={`${styles.body}`}>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Cookie settings</p>
              <p>
                Customize cookies. See{" "}
                <span>
                  <a
                    href="https://www.notion.so/Cookie-Notice-bc186044eed5488a8387a9e94b14e58c"
                    target="blank"
                  >
                    Cookie Notice
                  </a>
                </span>{" "}
                for details.
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="cookie" id="cookie" disabled>
                  <option value="customize">Customize</option>
                </select>
              </label>
            </div>
          </div>
          <div className={`${styles.value_control}`}>
            <div className={`${styles.key}`}>
              <p>Show my view history</p>
              <p>
                People with edit or full access will be able to see when you’ve
                viewed a page.{" "}
                <span>
                  <a
                    href="https://www.notion.so/help/page-analytics"
                    target="blank"
                  >
                    Learn more.
                  </a>
                </span>
                .
              </p>
            </div>
            <div className={`${styles.control}`}>
              <label className={`${styles.select}`}>
                <select name="record" id="record" disabled>
                  <option value="record">Record</option>
                  <option value="dont">Don't</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
