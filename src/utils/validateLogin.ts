export type validateLoginProps = {
  email: string;
  password: string;
};

export const validateLogin = (values: validateLoginProps) => {
  const errors: Partial<validateLoginProps> = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
