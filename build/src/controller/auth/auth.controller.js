"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const conteroller_module_1 = require("../conteroller.module");
class AuthController {
    #authServices;
    constructor() {
        this.#authServices = new conteroller_module_1.AuthCases();
    }
    register = async (req, res) => {
        const body = req.body;
        const resp = await this.#authServices.register(body);
        return res.status(resp.code).json(resp.data);
    };
    login = async (req, res) => {
        const body = req.body;
        const resp = await this.#authServices.authClient(body);
        return res.status(resp.code).json(resp.data);
    };
}
exports.AuthController = AuthController;
