import { ClientRepository } from "../../repository/client.repository";
import { AuthModel } from "../../models/auth.model";
import { sign } from "jsonwebtoken";
import { ClientModel } from "../usesCases.module";
import CreditGenerator from "creditcard-generator";
import { Prisma, prisma, PrismaClient } from "../../database/db";
import { comparePin, hashPin } from "../../helpers/bcrypt";
import { CleanData } from "../../helpers/cleanData";

export class AuthCases {
  #clientRepository: ClientRepository = new ClientRepository();
  #db: PrismaClient;

  constructor() {
    this.#db = prisma;
  }

  async authClient(body: AuthModel) {
    try {
      const client = await this.#clientRepository.getClient({
        card_number: body.card_number,
      });

      if (!client) {
        return { message: "Client Not Found" };
      }

      if (!comparePin(body.pin, client.data.pin)) {
        return { message: "Password do not match" };
      }

      const token = sign(
        {
          email: client.data.email,
          username: client.data.username,
          rol: client.data.rol,
        },
        process.env.SECRET_OR_KEY!,
        { expiresIn: "1d" }
      );

      return { token, client: client.data.id, IsAuth: true };
    } catch (error: any) {
      return {
        message: error.message,
      };
    }
  }

  async register(body: ClientModel) {
    try {
      const {
        email,
        firts_name,
        last_name,
        phone,
        pin,
        username,
      }: ClientModel = body;

      const creditCard = CreditGenerator.GenCC()[0];

      const client = await this.#db.tbl_client.create({
        data: {
          balance: 500,
          pin: hashPin(pin).encrypted,
          card_number: creditCard,
          email,
          tbl_user: {
            create: {
              username,
              tbl_person: {
                create: {
                  email,
                  firts_name,
                  last_name,
                  phone1: phone,
                  tbl_gender: { connect: { id: 1 } },
                },
              },
              tbl_role: {
                connect: { id: 2 },
              },
            },
          },
          tbl_transaction: {
            create: {
              amont: "500" as any,
              origin_card: "1",
              destiny_card: creditCard,
            },
          },
        },
      });

      return client;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          message: `Unique constraint failed on the ${
            (error.meta as any).target
              ? (error.meta as any).target
              : (error.meta as any).cause
          }`,
        };
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return {
          message: `Unique constraint failed on the ${error.name}`,
        };
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        return { message: error.message.split("\n")[20] };
      }
      return { message: "Error" };
    }
  }
}
