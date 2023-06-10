import React, { useContext, useEffect, useId, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as NotionLogo } from "../../assets/images/notion-logo.svg";
import styles from "./register.module.scss";
import { useRegisterUserData } from "../../services/useUserData";
import {
  createImageFromInitials,
  getRandomColor,
} from "../../utils/generateProfilePicture";
import { useThemeDetector } from "../../hooks/useThemeDetector";
import { parseJWT } from "../../utils/parseJWT";
import { request } from "../../lib/axios";

type validateProps = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>("invalid passsword");
  const [formErrors, setFormErrors] = useState<Partial<validateProps>>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const isDarkMode = useThemeDetector();
  const { mutate } = useRegisterUserData();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const color = getRandomColor();
      const url = createImageFromInitials(50, name, color)!;

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
          const { userId } = parseJWT(data.accessToken);

          console.log("at", data.accessToken);
          console.log("ui", userId);

          // const user = await request({ url: `/users/${userId}` });

          // console.log("user", JSON.stringify(user, null, 2));
        },
      });

      setName("");
      setEmail("");
      setPassword("");
    }
  }, [formErrors]);

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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setFormErrors(validate({ name, email, password }));
    setIsSubmit(true);

    // TODO: add register flow
  };

  const validate = (values: validateProps) => {
    const errors: Partial<validateProps> = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter valid Email!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (+values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (+values.password.length > 12) {
      errors.password = "Password must be less than 12 characters!";
    }

    return errors;
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.nav}`}>
        <NotionLogo data-testid="notion-logo" className={`${styles.logo}`} />
        <p>Notion</p>
      </div>
      <div className={`${styles.register_panel}`}>
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
    </div>
  );
};

export default Register;
