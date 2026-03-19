export interface UserState {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  isAuthenticated: boolean;
}
