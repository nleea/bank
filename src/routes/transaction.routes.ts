import { Router } from "./module.routes";
import { TransactionController } from "../controller/transaction/transaction.controller";
import { isAdmin } from "../middleware/isAdmin.middleware";

export class TransactionRoute {
  #transactionController: TransactionController;

  constructor() {
    this.#transactionController = new TransactionController();
  }

  routes() {
    const router = Router({ mergeParams: true });

    router.post("/transaction/", this.#transactionController.postTransaction);
    router.delete(
      "/transaction/delete/:id/",
      [isAdmin],
      this.#transactionController.deleteTransaction
    );

    return router;
  }
}
