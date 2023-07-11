import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import RegisterPanel from "../register-panel";
import styles from "./addAccount.module.scss";

type AddAccountProps = {
  addAccountOpen: boolean;
  addAccountOnClose: () => void;
};

const AddAccount: React.FC<AddAccountProps> = ({
  addAccountOpen,
  addAccountOnClose,
}) => {
  const { theme } = useContext(ThemeContext);

  if (!addAccountOpen) return null;

  return (
    <div
      className={`${styles.add_account_background} ${styles[theme]}`}
      onClick={addAccountOnClose}
    >
      <div
        className={`${styles.add_account}`}
        onClick={(e) => e.stopPropagation()}
      >
        <RegisterPanel />
      </div>
    </div>
  );
};

export default AddAccount;
