"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const conteroller_module_1 = require("../conteroller.module");
class ClientController {
    #services;
    constructor() {
        this.#services = new conteroller_module_1.ClientServices();
    }
    getClient = async (req, res) => {
        const id = req.user.id;
        const resp = await this.#services.getClientInfo(id);
        res.status(resp.code).json(resp.data);
    };
    updateClient = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const resp = await this.#services.patchClient(Number(id), body);
        res.status(resp.code).json(resp.data);
    };
    deleteClient = async (req, res) => {
        const { id } = req.params;
        const resp = await this.#services.deleteClient(Number(id));
        res.status(resp.code).json(resp.data);
    };
}
exports.ClientController = ClientController;
