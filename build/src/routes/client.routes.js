"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const client_controller_1 = require("../controller/client/client.controller");
const module_routes_1 = require("./module.routes");
const client_middleware_1 = require("../middleware/client.middleware");
class ClientRoutes {
    #controller;
    constructor() {
        this.#controller = new client_controller_1.ClientController();
    }
    routes() {
        const router = (0, module_routes_1.Router)({ mergeParams: true });
        router.get("/profile/", client_middleware_1.ClientMiddleware, this.#controller.getClient);
        router.patch("/update/:id", client_middleware_1.ClientMiddleware, this.#controller.updateClient);
        router.delete("/delete/:id", client_middleware_1.ClientMiddleware, this.#controller.deleteClient);
        return router;
    }
}
exports.ClientRoutes = ClientRoutes;
