import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as NotionLogo } from "../../assets/images/notion-logo.svg";
import styles from "./register.module.scss";

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

    // TODO: add login flow

    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    setName("");
    setEmail("");
    setPassword("");
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
          <br />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            placeholder="Enter your email address..."
            onChange={handleEmailChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password..."
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">Sign up</button>
        </form>
        <br />
        {error && <p className={`${styles.error}`}>{error}</p>}
        <br />
        <p>Already have an account?</p> <a href="/">Login</a>
      </div>
    </div>
  );
};

export default Register;
