export type validateLoginProps = {
  email: string;
  password: string;
};

export type validateRegistrationProps = {
  name: string;
  email: string;
  password: string;
};

export type validateCreateWorkspaceProps = {
  name: string;
};

export class Validate {
  static validateLogin(values: validateLoginProps) {
    const errors: Partial<validateLoginProps> = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid Email!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 12) {
      errors.password = "Password must be less than 12 characters!";
    }

    return errors;
  }

  static validateRegistration(values: validateRegistrationProps) {
    const errors: Partial<validateRegistrationProps> = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid Email!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 12) {
      errors.password = "Password must be less than 12 characters!";
    }

    return errors;
  }

  static validateCreateWorkspace(values: validateCreateWorkspaceProps) {
    const errors: Partial<validateCreateWorkspaceProps> = {};

    if (!values.name) {
      errors.name = "Name is required!";
    }

    return errors;
  }
}
