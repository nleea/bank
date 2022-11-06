import { prisma, PrismaClient } from "./modules.repository";
import { TransactionModel } from "../models/transaction.model";

export class TransactioService {
  #db: PrismaClient;

  constructor() {
    this.#db = prisma;
  }

  async createTransaction(data: TransactionModel) {
    try {
      const client = await this.#db.tbl_client.findUnique({
        where: { card_number: data.origin_card },
      });
      if (!client || client?.balance < Number(data.amont)) {
        return { message: "Transaction canceled" };
      }
      const resp = await this.#db.tbl_client.update({
        where: { id: client.id },
        data: {
          balance: { decrement: Number(data.amont) },
          tbl_transaction: {
            create: {
              amont: data.amont,
              destiny_card: data.destiny_card,
              origin_card: client.card_number,
            },
          },
        },
        include: {
          tbl_transaction: {
            select: {
              amont: true,
              origin_card: true,
              date: true,
              destiny_card: true,
            },
          },
        },
      });
      await this.#db.tbl_client.update({
        where: { card_number: data.destiny_card },
        data: {
          balance: {
            increment: Number(data.amont),
          },
        },
      });
      return {
        data: resp.tbl_transaction,
      };
    } catch (error) {
      return { message: error };
    }
  }

  async deleteTransaction(id: number) {
    try {
      await this.#db.tbl_transaction.delete({ where: { id: id } });
      return { message: "Ok" };
    } catch (error) {
      return { message: error };
    }
  }
}
