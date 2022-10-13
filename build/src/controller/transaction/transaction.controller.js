"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_repository_1 = require("../../uses-cases/transaction/transaction.repository");
class TransactionController {
    #transactionRespository;
    constructor() {
        this.#transactionRespository = new transaction_repository_1.TransactinRepository();
    }
    postTransaction = async (req, res) => {
        const { destiny_card, amont } = req.body;
        const globalUser = req.user;
        const body = {
            destiny_card,
            amont,
            origin_card: globalUser.card_number,
        };
        const resp = await this.#transactionRespository.postTransaction(body);
        return res.status(200).json(resp);
    };
    deleteTransaction = async (req, res) => {
        const { id } = req.params;
        const resp = await this.#transactionRespository.deleteTransaction(Number(id));
        return res.status(200).json(resp);
    };
}
exports.TransactionController = TransactionController;
