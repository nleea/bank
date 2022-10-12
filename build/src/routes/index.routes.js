"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const client_routes_1 = require("./client.routes");
const module_routes_1 = require("./module.routes");
const auth_controller_1 = require("../controller/auth/auth.controller");
const jwt_config_1 = require("../config/jwt-config");
class IndexRouter {
    #clientRoute;
    #authRoute;
    constructor() {
        this.#clientRoute = new client_routes_1.ClientRoutes();
        this.#authRoute = new auth_controller_1.AuthController();
    }
    routes() {
        const router = (0, module_routes_1.Router)();
        const mergeRouter = (0, module_routes_1.Router)({ mergeParams: true });
        mergeRouter.use("/client/", [jwt_config_1.jwtAuthenticate.authenticate("jwt", { session: false })], this.#clientRoute.routes());
        mergeRouter.use("/auth/client/login/", this.#authRoute.login);
        mergeRouter.use("/auth/client/register/", this.#authRoute.register);
        router.use("/v1/", mergeRouter);
        return router;
    }
}
exports.IndexRouter = IndexRouter;
