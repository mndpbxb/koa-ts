import { Attachment } from "./attachment";
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profile?: Attachment;
  cover?: Attachment;
  created: Date;
  updated: Date;
  deleted?: Date;
}
