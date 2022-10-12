"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const modules_repository_1 = require("./modules.repository");
const cleanData_1 = require("../helpers/cleanData");
class ClientRepository {
    #db;
    constructor() {
        this.#db = modules_repository_1.prisma;
    }
    async getClient(props) {
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
                    tbl_transaction: true,
                },
            });
            if (!resp) {
                return { message: "User Not found" };
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
                "origin_card",
                "destiny_card",
                "tbl_client",
            ], true);
            return {
                data: { ...data, transaction: resp.tbl_transaction },
            };
        }
        catch (error) {
            return { message: error };
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
            return {
                data: resp,
            };
        }
        catch (error) {
            return { message: error };
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
                return { message: "User Not Found" };
            }
            const personID = client?.tbl_user?.tbl_person?.id;
            await this.#db.tbl_person.deleteMany({
                where: { id: personID },
            });
            return { message: "Ok" };
        }
        catch (error) {
            return { message: error };
        }
    }
}
exports.ClientRepository = ClientRepository;
