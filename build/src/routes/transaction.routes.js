"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoute = void 0;
const module_routes_1 = require("./module.routes");
const transaction_controller_1 = require("../controller/transaction/transaction.controller");
const isAdmin_middleware_1 = require("../middleware/isAdmin.middleware");
class TransactionRoute {
    #transactionController;
    constructor() {
        this.#transactionController = new transaction_controller_1.TransactionController();
    }
    routes() {
        const router = (0, module_routes_1.Router)({ mergeParams: true });
        router.post("/transaction/", this.#transactionController.postTransaction);
        router.delete("/transaction/delete/:id/", [isAdmin_middleware_1.isAdmin], this.#transactionController.deleteTransaction);
        return router;
    }
}
exports.TransactionRoute = TransactionRoute;
