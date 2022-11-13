import { ClientRepository } from "../../repository/client.repository";
import { AuthModel } from "../../models/auth.model";
import { sign } from "jsonwebtoken";
import { ClientModel } from "../usesCases.module";
import CreditGenerator from "creditcard-generator";
import { Prisma, prisma, PrismaClient } from "../../database/db";
import { comparePin, hashPin } from "../../helpers/bcrypt";

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
      
      if ('message' in client.data) {
        return { data: { message: "Client Not Found" }, code: 404 };
      }

      if (!comparePin(body.pin, client.data.pin)) {
        return { data: { message: "Password do not match" }, code: 404 };
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
      
      return {
        data: { token, client: client.data.id, IsAuth: true },
        code: 200,
      };
    } catch (error: any) {
      return {
        data: {
          message: error.message,
        },
        code: 400,
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

      return { data: client, code: 200 };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          data: {
            message: `Unique constraint failed on the ${
              (error.meta as any).target
                ? (error.meta as any).target
                : (error.meta as any).cause
            }`,
          },
          code: 400,
        };
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return {
          data: {
            message: `Unique constraint failed on the ${error.name}`,
          },
          code: 400,
        };
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        return { data: { message: error.message.split("\n")[20] }, code: 400 };
      }
      return { data: { message: "Error" }, code: 400 };
    }
  }
}
