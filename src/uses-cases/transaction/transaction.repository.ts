import { TransactioService } from "../usesCases.module";
import { TransactionModel } from "../../models/transaction.model";

class TransactinRepository {
  #transactionService: TransactioService;
  constructor() {
    this.#transactionService = new TransactioService();
  }

  async postTransaction(body: TransactionModel) {
    return this.#transactionService.createTransaction(body);
  }

  async deleteTransaction(id: number) {
    return this.#transactionService.deleteTransaction(id);
  }
}

export { TransactinRepository };
