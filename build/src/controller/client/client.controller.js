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
        const { id } = req.params;
        const resp = await this.#services.getClientInfo(Number(id));
        res.status(200).json(resp);
    };
    updateClient = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const resp = await this.#services.patchClient(Number(id), body);
        res.status(200).json(resp);
    };
    deleteClient = async (req, res) => {
        const { id } = req.params;
        const resp = await this.#services.deleteClient(Number(id));
        res.status(200).json(resp);
    };
}
exports.ClientController = ClientController;
