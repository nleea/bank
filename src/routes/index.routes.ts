import { ClientRoutes } from "./client.routes";
import { Router } from "./module.routes";
import { AuthController } from "../controller/auth/auth.controller";
import { jwtAuthenticate } from "../config/jwt-config";

export class IndexRouter {
  #clientRoute: ClientRoutes;
  #authRoute: AuthController;

  constructor() {
    this.#clientRoute = new ClientRoutes();
    this.#authRoute = new AuthController();
  }

  routes() {
    const router = Router();
    const mergeRouter = Router({ mergeParams: true });

    mergeRouter.use(
      "/client/",
      [jwtAuthenticate.authenticate("jwt", { session: false })],
      this.#clientRoute.routes()
    );
    mergeRouter.use("/auth/client/login/", this.#authRoute.login);
    mergeRouter.use("/auth/client/register/", this.#authRoute.register);
    router.use("/v1/", mergeRouter);

    return router;
  }
}
