import React, { useContext, useEffect, useState } from "react";
import { Validate, validateLoginProps } from "../../utils/validate";
import { useUserData } from "../../services/useUserData";
import { JWTParser } from "../../utils/parseJWT";
import { request } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";
import { AxiosError } from "axios";
import { setWorkspace } from "../../slice/workspaceSlice";
import { ThemeContext } from "../../context/ThemeContext";
import { setPage } from "../../slice/pageSlice";
import styles from "./loginPanel.module.scss";
import { Link } from "react-router-dom";

const LoginPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<validateLoginProps>>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { mutate } = useUserData.useLoginUserData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsSubmitting(true);
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

          const pageId = workspace.data.pages[0].id;
          const page = await request({
            url: `/pages/${pageId}`,
          });

          dispatch(setUser({ ...user.data }));
          dispatch(setWorkspace({ ...workspace.data }));
          dispatch(setPage({ ...page.data }));

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
    <div className={`${styles.login_panel} ${styles[theme]}`}>
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
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
        >
          Log in
        </button>
        <br />
      </form>
      {error && <p className={`${styles.error}`}>{error}</p>}
      <Link to="/register">Create New Account</Link>
    </div>
  );
};

export default LoginPanel;
