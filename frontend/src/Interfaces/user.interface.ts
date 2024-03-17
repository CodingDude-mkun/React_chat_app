export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface userAuthContext {
  authUser: IUser | null;
  setAuthUser: (value: unknown) => void;
}
