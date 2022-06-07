import { File } from "@koa/multer";

export interface CreateAttachment {
  id?: number;
  file: File;
  ownerType: string;
  ownerId: number;
  purpose: string;
  created?: Date;
  deleted?: Date;
}

export interface Attachment {}
