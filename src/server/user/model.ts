import { User } from "../../entities";
import { Attachment } from "../../entities/attachment";

export interface CreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class UserModel {
  public id?: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public created: Date;
  public updated: Date;
  public profileImage?: Attachment;
  public coverImage?: Attachment;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.created = user.created;
    this.updated = user.updated;
    this.coverImage = user.cover;
    this.profileImage = user.profile;
  }
}
