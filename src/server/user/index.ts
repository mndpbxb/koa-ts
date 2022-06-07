import Router from "@koa/router";

import * as controller from "./controller";
import {
  changePassword,
  createUser,
  destroy,
  login,
  updateUser,
} from "./validator";
import { validator } from "../middlewares/validator";
import { upload } from "../../lib/uploader";
import { authentication, authorization } from "../middlewares";
import { Role } from "../../lib/authentication";

const router = new Router();

router.get("/me", authentication(), controller.get);

router.post(
  "/",
  upload.single("profile"),
  validator.validateBody(createUser),
  controller.create
);

router.post(
  "/login",
  upload.any(),
  validator.validateBody(login),
  controller.login
);

router.put(
  "/",
  upload.any(),
  validator.validateBody(updateUser),
  authentication(),
  authorization([Role.admin, Role.user]),
  controller.update
);

router.put(
  "/password",
  upload.any(),
  authentication(),
  authorization([Role.admin, Role.user]),
  validator.validateBody(changePassword),
  controller.changePassword
);

router.delete(
  "/:id",
  upload.single("image"),
  authentication(),
  authorization([Role.admin]),
  validator.validateQuery(destroy),
  controller.destroy
);
// router.post(
//   "/login",
//   bodyParser(),
//   middleware.validate({ request: { body: validators.login } }),
//   controller.login.bind(controller)
// );

// router.put(
//   "/",
//   bodyParser(),
//   middleware.authentication(container.lib.authenticator),
//   middleware.authorization([Role.user, Role.admin]),
//   middleware.validate({ request: { body: validators.updateUser } }),
//   controller.update.bind(controller)
// );

// router.put(
//   "/password",
//   bodyParser(),
//   middleware.authentication(container.lib.authenticator),
//   middleware.authorization([Role.user, Role.admin]),
//   middleware.validate({
//     request: {
//       body: validators.changePassword,
//     },
//   }),
//   controller.changePassword.bind(controller)
// );

// router.delete(
//   "/:id",
//   middleware.authentication(container.lib.authenticator),
//   middleware.authorization([Role.admin]),
//   middleware.validate({
//     params: { id: Joi.number().required() },
//   }),
//   controller.delete.bind(controller)
// );

// router.get("/", getUser);

export default router;

// export function init(server: Koa, container: ServiceContainer) {
//   const fileStorage = multer.diskStorage({
//     destination: (ctx, file, cb) => {
//       const date = new Date();
//       const dir = `./dist/public/${date.getFullYear()}/${
//         date.getMonth() + 1
//       }/${date.getDate()}`;
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }
//       console.log(ctx, file);
//       cb(null, dir);
//     },
//     filename: (ctx, file, cb) => {
//       const date = new Date();
//       cb(null, `${date.getTime()}-${file.originalname}`);
//       console.log(ctx);
//     },
//   });
//   const upload = multer({ storage: fileStorage });

//   const router = new Router({ prefix: "/api/v1/users" });
//   const controller = new UserController(container.managers.user);

//   router.get(
//     "/me",
//     upload.any(),
//     middleware.authentication(container.lib.authenticator),
//     middleware.authorization([Role.user, Role.admin]),
//     controller.get.bind(controller)
//   );

//   router.post(
//     "/",
//     bodyParser(),
//     middleware.validate({ request: { body: validators.createUser } }),
//     controller.create.bind(controller)
//   );

//   router.post(
//     "/login",
//     bodyParser(),
//     middleware.validate({ request: { body: validators.login } }),
//     controller.login.bind(controller)
//   );

//   router.put(
//     "/",
//     bodyParser(),
//     middleware.authentication(container.lib.authenticator),
//     middleware.authorization([Role.user, Role.admin]),
//     middleware.validate({ request: { body: validators.updateUser } }),
//     controller.update.bind(controller)
//   );

//   router.put(
//     "/password",
//     bodyParser(),
//     middleware.authentication(container.lib.authenticator),
//     middleware.authorization([Role.user, Role.admin]),
//     middleware.validate({
//       request: {
//         body: validators.changePassword,
//       },
//     }),
//     controller.changePassword.bind(controller)
//   );

//   router.delete(
//     "/:id",
//     middleware.authentication(container.lib.authenticator),
//     middleware.authorization([Role.admin]),
//     middleware.validate({
//       params: { id: Joi.number().required() },
//     }),
//     controller.delete.bind(controller)
//   );

//   server.use(router.routes());
// }
