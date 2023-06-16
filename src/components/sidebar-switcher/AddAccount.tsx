import styles from "./addAccount.module.scss";

type AddAccountProps = {
  addAccountOpen: boolean;
  addAccountOnClose: () => void;
};

const AddAccount: React.FC<AddAccountProps> = ({
  addAccountOpen,
  addAccountOnClose,
}) => {
  if (!addAccountOpen) return null;

  return (
    <div
      className={`${styles.add_account_background}`}
      onClick={addAccountOnClose}
    >
      <div
        className={`${styles.add_account}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TODO add register panel*/}
      </div>
    </div>
  );
};

export default AddAccount;
