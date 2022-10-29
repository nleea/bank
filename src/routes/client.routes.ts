import { ClientController } from "../controller/client/client.controller";
import { Router } from "./module.routes";
import { ClientMiddleware } from "../middleware/client.middleware";

export class ClientRoutes {
  #controller: ClientController;

  constructor() {
    this.#controller = new ClientController();
  }

  routes() {
    const router = Router({ mergeParams: true });

    router.get("/profile/:id/", ClientMiddleware, this.#controller.getClient);
    router.patch(
      "/update/:id",
      ClientMiddleware,
      this.#controller.updateClient
    );

    router.delete(
      "/delete/:id",
      ClientMiddleware,
      this.#controller.deleteClient
    );

    return router;
  }
}
