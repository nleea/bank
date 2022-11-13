"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const modules_repository_1 = require("./modules.repository");
const cleanData_1 = require("../helpers/cleanData");
const db_1 = require("../database/db");
class ClientRepository {
    #db;
    constructor() {
        this.#db = modules_repository_1.prisma;
    }
    async getClient(props, pin = false) {
        try {
            const resp = await this.#db.tbl_client.findUnique({
                where: { card_number: props.card_number, id: props.id },
                include: {
                    tbl_user: {
                        include: {
                            tbl_person: {
                                include: { tbl_gender: { select: { gender: true } } },
                            },
                            tbl_role: { select: { role: true } },
                        },
                    },
                    tbl_transaction: {
                        select: {
                            amont: true,
                            date: true,
                            origin_card: true,
                            destiny_card: true,
                        },
                    },
                },
            });
            if (!resp) {
                return { data: { message: "User Not found" }, code: 404 };
            }
            let result = (0, modules_repository_1.flattenObj)(resp);
            let data = (0, cleanData_1.CleanData)(result, [
                "tbl_person_ID",
                "tbl_role_ID",
                "tbl_user_ID",
                "firts_name",
                "last_name",
                "gender",
                "id",
                pin ? "pin" : "",
                "origin_card",
                "destiny_card",
                "tbl_client",
            ], true);
            return {
                data: { ...data, id: resp.id, transaction: resp.tbl_transaction },
                code: 200,
            };
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                return { data: { message: error.cause }, code: 404 };
            }
            return { data: { message: error }, code: 400 };
        }
    }
    async updateClient(id, body) {
        try {
            const client = {
                email: body.email,
            };
            const person = { phone1: body.phone, email: body.email };
            if (body.pin) {
                client["pin"] = (0, modules_repository_1.hashPin)(body.pin).encrypted;
            }
            const resp = await this.#db.tbl_client.update({
                where: { id: id },
                data: {
                    ...client,
                    tbl_user: {
                        update: {
                            tbl_person: { update: { ...person } },
                        },
                    },
                },
            });
            const data_clean = (0, cleanData_1.CleanData)(resp, ["tbl_user_ID"]);
            return {
                data: {
                    data_clean,
                },
                code: 200,
            };
        }
        catch (error) {
            return { data: { message: error }, code: 400 };
        }
    }
    async deleteClient(id) {
        try {
            const client = await this.#db.tbl_client.findUnique({
                where: { id: id },
                select: {
                    tbl_user: { select: { tbl_person: { select: { id: true } } } },
                },
            });
            if (!client) {
                return { data: { message: "User Not Found" }, code: 404 };
            }
            const personID = client?.tbl_user?.tbl_person?.id;
            await this.#db.tbl_person.deleteMany({
                where: { id: personID },
            });
            return { data: { message: "Ok" }, code: 200 };
        }
        catch (error) {
            return { data: { message: error }, code: 400 };
        }
    }
}
exports.ClientRepository = ClientRepository;
