import { UserData } from './';

export interface SignupResponse {
  token: string;
  user: UserData;
}
