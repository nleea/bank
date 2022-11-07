"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientServices = void 0;
const usesCases_module_1 = require("../usesCases.module");
class ClientServices {
    #clientService;
    constructor() {
        this.#clientService = new usesCases_module_1.ClientRepository();
    }
    async getClientInfo(id) {
        const resp = await this.#clientService.getClient({ id: id }, true);
        return resp;
    }
    async patchClient(id, body) {
        const resp = await this.#clientService.updateClient(id, body);
        return resp;
    }
    async deleteClient(id) {
        const resp = await this.#clientService.deleteClient(id);
        return resp;
    }
}
exports.ClientServices = ClientServices;
