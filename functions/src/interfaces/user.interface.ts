export interface BaseUserInfo {
  email: string;
  username: string;
}

export interface SignUpData extends BaseUserInfo {
  confirmPassword: string;
  password: string;
}

export interface UserData extends BaseUserInfo {
  createdAt: string;
  uid: string;
}
