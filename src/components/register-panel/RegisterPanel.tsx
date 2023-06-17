import React, { useContext, useEffect, useState } from "react";
import styles from "./registerPanel.module.scss";
import { Validate, validateRegistrationProps } from "../../utils/validate";
import { useThemeDetector } from "../../hooks/useThemeDetector";
import { useUserData } from "../../services/useUserData";
import { useDispatch } from "react-redux";
import { GenerateProfilePicture } from "../../utils/generateProfilePicture";
import { JWTParser } from "../../utils/parseJWT";
import { request } from "../../lib/axios";
import { setUser } from "../../slice/userSlice";
import { setWorkspace } from "../../slice/workspaceSlice";
import { AxiosError } from "axios";
import { ThemeContext } from "../../context/ThemeContext";

const RegisterPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<
    Partial<validateRegistrationProps>
  >({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const isDarkMode = useThemeDetector();
  const { mutate } = useUserData.useRegisterUserData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleRegistration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmit]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setFormErrors(Validate.validateRegistration({ name, email, password }));
    setIsSubmit(true);
  };

  const handleRegistration = () => {
    const color = GenerateProfilePicture.getRandomColor();
    const url = GenerateProfilePicture.createImageFromInitials(
      50,
      name,
      color
    )!;

    const userData = {
      name,
      email,
      password,
      isDarkMode,
      profilePicture: {
        url,
      },
    };

    mutate(userData, {
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

          setName("");
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
    <div className={`${styles.register_panel} ${styles[theme]}`}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Enter your full name..."
          onChange={handleNameChange}
        />
        {formErrors.name && (
          <p className={`${styles.error}`}>{formErrors.name}</p>
        )}
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
        <button type="submit">Sign up</button>
        <br />
      </form>
      {error && <p className={`${styles.error}`}>{error}</p>}
      <p>Already have an account?</p> <a href="/">Login</a>
    </div>
  );
};

export default RegisterPanel;