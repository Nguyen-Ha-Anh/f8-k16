export type AuthType = {
  children: React.ReactNode;
};

export interface LoginFormData{
  email: string;
  password: string;
};

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
};

export interface AUthState {
  profile: any | null
  loading: boolean
  error: string | null
}

export interface Profile {
  email: string;
  username: string;
  fullName?: string;
  profilePicture?: string;
}
