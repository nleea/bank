import { PrismaClient, Prisma } from "@prisma/client";
import { hashPin } from "../helpers/bcrypt";

const prisma = new PrismaClient();

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
        pin: hashPin("3602").encrypted,
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

export { prisma, PrismaClient, Prisma };
