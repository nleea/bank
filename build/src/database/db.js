"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = exports.PrismaClient = exports.prisma = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "PrismaClient", { enumerable: true, get: function () { return client_1.PrismaClient; } });
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
const bcrypt_1 = require("../helpers/bcrypt");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
async function main() {
    const register = await prisma.tbl_role.count();
    if (register < 1) {
        await prisma.tbl_role.createMany({
            data: [{ role: "admin" }, { role: "client" }],
        });
        await prisma.tbl_gender.createMany({
            data: [{ gender: "ninguno" }, { gender: "F" }, { gender: "M" }],
        });
        const user = await prisma.tbl_user.create({
            data: { username: "admin", tbl_role: { connect: { id: 1 } } },
        });
        await prisma.tbl_client.create({
            data: {
                balance: 500,
                card_number: "1",
                email: "admin@gmial.com",
                pin: (0, bcrypt_1.hashPin)("3602").encrypted,
                tbl_user: { connect: { id: user.id } },
            },
        });
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
