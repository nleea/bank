"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = require("../routes/index.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../swagger.json"));
const helmet_1 = __importDefault(require("helmet"));
class Server {
    #app;
    constructor() {
        this.#app = (0, express_1.default)();
        this.#middleware();
        this.#routes();
    }
    #middleware() {
        this.#app.set("port", process.env.PORT || 3000);
        this.#app.use(express_1.default.json());
        this.#app.use(express_1.default.urlencoded({ extended: false }));
        this.#app.use((0, morgan_1.default)("dev"));
        this.#app.use((0, helmet_1.default)());
    }
    #routes() {
        var options_ = {
            explorer: true,
        };
        this.#app.use("/api/", new index_routes_1.IndexRouter().routes());
        this.#app.use("/api-doc/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, options_));
    }
    listen() {
        this.#app.listen(this.#app.get("port"), () => {
            console.log("Server on port: ", this.#app.get("port"));
        });
    }
}
exports.Server = Server;
