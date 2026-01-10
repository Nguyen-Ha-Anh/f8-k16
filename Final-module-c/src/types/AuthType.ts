export type AuthType = {
  children: React.ReactNode;
};

// export interface PasswordInputType {
//   value: string;
//   onChange: (value: string) => void;
// };

export type LoginType = 'phone' | 'email' | 'username';

export interface LoginFormData{
  identifier: string;
  password: string;
  type: LoginType;
};

export interface RegisterFormData {
  identifier: string;
  password: string;
  fullname: string;
  username: string;
};