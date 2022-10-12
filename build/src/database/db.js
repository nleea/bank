"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = exports.PrismaClient = exports.prisma = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "PrismaClient", { enumerable: true, get: function () { return client_1.PrismaClient; } });
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
