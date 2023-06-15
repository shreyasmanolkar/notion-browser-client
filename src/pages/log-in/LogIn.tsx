import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as NotionLogo } from "../../assets/icons/notion-logo.svg";
import { Validate, validateLoginProps } from "../../utils/validate";
import { useUserData } from "../../services/useUserData";
import { JWTParser } from "../../utils/parseJWT";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";
import { AxiosError } from "axios";
import styles from "./login.module.scss";
import { setWorkspace } from "../../slice/workspaceSlice";

const LogIn = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<validateLoginProps>>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { mutate } = useUserData.useLoginUserData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmit]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setFormErrors(Validate.validateLogin({ email, password }));
    setIsSubmit(true);
  };

  const handleLogin = () => {
    const credientials = {
      email,
      password,
    };

    mutate(credientials, {
      onSuccess: async (data) => {
        if (data) {
          const { userId } = JWTParser.parseJWT(data.accessToken);
          const user = await request({ url: `/users/${userId}` });

          const { workspaceId } = user.data.workspaces?.[0] || {};
          const workspace = await request({
            url: `/workspaces/${workspaceId}`,
          });

          dispatch(setUser({ ...user.data }));
          dispatch(setWorkspace({ ...workspace.data }));

          setEmail("");
          setPassword("");

          // redirect from here
        }
      },
      onError: (error: AxiosError) => {
        const data = error.response?.data as {
          error: string;
        };

        setError(data.error);
      },
    });
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.nav}`}>
        <NotionLogo data-testid="notion-logo" className={`${styles.logo}`} />
        <p>Notion</p>
      </div>
      <div className={`${styles.login_panel}`}>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            placeholder="Enter your email address..."
            onChange={handleEmailChange}
          />
          {formErrors.email && (
            <p className={`${styles.error}`}>{formErrors.email}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password..."
            onChange={handlePasswordChange}
          />
          {formErrors.password && (
            <p className={`${styles.error}`}>{formErrors.password}</p>
          )}
          <button type="submit">Log in</button>
          <br />
        </form>
        {error && <p className={`${styles.error}`}>{error}</p>}
        <a href="/">Create New Account</a>
      </div>
    </div>
  );
};

export default LogIn;
