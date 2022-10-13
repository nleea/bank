"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactinRepository = void 0;
const usesCases_module_1 = require("../usesCases.module");
class TransactinRepository {
    #transactionService;
    constructor() {
        this.#transactionService = new usesCases_module_1.TransactioService();
    }
    async postTransaction(body) {
        return this.#transactionService.createTransaction(body);
    }
    async deleteTransaction(id) {
        return this.#transactionService.deleteTransaction(id);
    }
}
exports.TransactinRepository = TransactinRepository;
