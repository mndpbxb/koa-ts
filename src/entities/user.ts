export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created: Date;
  updated: Date;
  deleted?: Date;
}
