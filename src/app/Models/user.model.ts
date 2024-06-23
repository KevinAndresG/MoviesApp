export interface UserType {
  Email: string;
  Password: string;
}

export interface UserTypeValidation {
  Email: boolean;
  Password: boolean;
  Message: string;
}

export interface UserRecoverValidation {
  Email: boolean;
  Message: string;
}
