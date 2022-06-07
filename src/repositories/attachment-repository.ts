import { getConnection } from "../lib/database";
import { CreateAttachment } from "../entities";
import { Attachment } from "../entities/attachment";

const TABLE = "attachment";

const insert = async (attachment: CreateAttachment) => {
  const conn = await getConnection();

  const result = await conn.table(TABLE).insert(
    {
      file_name: attachment.file.filename,
      destination: attachment.file.destination.split("public/")[1],
      owner_type: attachment.ownerType,
      owner_id: attachment.ownerId,
      mime_type: attachment.file.mimetype,
      purpose: attachment.purpose || "general",
      created: new Date(),
    },
    "id"
  );
  attachment.id = result[0].id;
  return transform(attachment);
};

const findOne = async (
  owner_type: string,
  owner_id: number,
  purpose: string
) => {
  const conn = await getConnection();
  return transform(
    await conn.table(TABLE).where({ owner_id, owner_type, purpose }).first()
  );
};

const findMany = async (
  owner_type: string,
  owner_id: number,
  purpose: string
) => {
  const conn = await getConnection();
  const result = await conn
    .table(TABLE)
    .where({ owner_id, owner_type, purpose });
  return result.map((r) => transform(r));
};

const transform = (r: any): Attachment => {
  return {
    fileName: r.file.filename,
    mimeType: r.file.mimetype,
    url: `${process.env.APP_URL}:${process.env.PORT}/${
      r.file.destination.split("public/")[1]
    }/${r.file.filename}`,
  };
};

export const AttachmentRepository = { insert, findOne, findMany };
