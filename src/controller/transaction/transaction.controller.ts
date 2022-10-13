import { Request, Response } from "../conteroller.module";
import { TransactinRepository } from "../../uses-cases/transaction/transaction.repository";
import { TransactionModel } from "../../models/transaction.model";

export class TransactionController {
  #transactionRespository: TransactinRepository;
  constructor() {
    this.#transactionRespository = new TransactinRepository();
  }

  postTransaction = async (req: Request, res: Response) => {
    const { destiny_card, amont } = req.body;
    const globalUser: any = req.user!;
    const body: TransactionModel = {
      destiny_card,
      amont,
      origin_card: globalUser.card_number,
    };
    const resp = await this.#transactionRespository.postTransaction(body);
    return res.status(200).json(resp);
  };

  deleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resp = await this.#transactionRespository.deleteTransaction(
      Number(id)
    );
    return res.status(200).json(resp);
  };
}
