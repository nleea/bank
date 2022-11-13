"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCases = void 0;
const client_repository_1 = require("../../repository/client.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const creditcard_generator_1 = __importDefault(require("creditcard-generator"));
const db_1 = require("../../database/db");
const bcrypt_1 = require("../../helpers/bcrypt");
class AuthCases {
    #clientRepository = new client_repository_1.ClientRepository();
    #db;
    constructor() {
        this.#db = db_1.prisma;
    }
    async authClient(body) {
        try {
            const client = await this.#clientRepository.getClient({
                card_number: body.card_number,
            });
            if ('message' in client.data) {
                return { data: { message: "Client Not Found" }, code: 404 };
            }
            if (!(0, bcrypt_1.comparePin)(body.pin, client.data.pin)) {
                return { data: { message: "Password do not match" }, code: 404 };
            }
            const token = (0, jsonwebtoken_1.sign)({
                email: client.data.email,
                username: client.data.username,
                rol: client.data.rol,
            }, process.env.SECRET_OR_KEY, { expiresIn: "1d" });
            return {
                data: { token, client: client.data.id, IsAuth: true },
                code: 200,
            };
        }
        catch (error) {
            return {
                data: {
                    message: error.message,
                },
                code: 400,
            };
        }
    }
    async register(body) {
        try {
            const { email, firts_name, last_name, phone, pin, username, } = body;
            const creditCard = creditcard_generator_1.default.GenCC()[0];
            const client = await this.#db.tbl_client.create({
                data: {
                    balance: 500,
                    pin: (0, bcrypt_1.hashPin)(pin).encrypted,
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
                            amont: "500",
                            origin_card: "1",
                            destiny_card: creditCard,
                        },
                    },
                },
            });
            return { data: client, code: 200 };
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                return {
                    data: {
                        message: `Unique constraint failed on the ${error.meta.target
                            ? error.meta.target
                            : error.meta.cause}`,
                    },
                    code: 400,
                };
            }
            if (error instanceof db_1.Prisma.PrismaClientUnknownRequestError) {
                return {
                    data: {
                        message: `Unique constraint failed on the ${error.name}`,
                    },
                    code: 400,
                };
            }
            if (error instanceof db_1.Prisma.PrismaClientValidationError) {
                return { data: { message: error.message.split("\n")[20] }, code: 400 };
            }
            return { data: { message: "Error" }, code: 400 };
        }
    }
}
exports.AuthCases = AuthCases;
