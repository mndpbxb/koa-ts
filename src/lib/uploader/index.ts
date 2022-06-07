import multer from "@koa/multer";
import fs from "fs";

const fileStorage = multer.diskStorage({
  destination: (ctx, file, cb) => {
    const date = new Date();
    const dir = `./public/${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    console.log(ctx, file);
    cb(null, dir);
  },
  filename: (ctx, file, cb) => {
    const date = new Date();
    cb(null, `${date.getTime()}-${file.originalname}`);
    console.log(ctx);
  },
});

export const upload = multer({ storage: fileStorage });
