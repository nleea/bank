"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMiddleware = void 0;
const module_middleware_1 = require("./module.middleware");
const jsonwebtoken_1 = require("jsonwebtoken");
const ClientMiddleware = async (req, res, next) => {
    const rol = await module_middleware_1.prisma.tbl_user.findUnique({
        where: { id: req.user.tbl_user_ID },
        include: { tbl_role: { select: { role: true } } },
    });
    if (rol?.tbl_role.role === "admin") {
        next();
    }
    else {
        const headerAuth = req.headers.authorization;
        if (!headerAuth?.startsWith("Bearer")) {
            return res.status(401).json({ message: "No Permited" });
        }
        const token = headerAuth.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No Permited" });
        }
        const tokenDecode = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_OR_KEY);
        const { id } = req.params;
        const client = await module_middleware_1.prisma.tbl_client.findUnique({
            where: { id: Number(id) },
        });
        if (!tokenDecode || !client) {
            return res.status(401).json({ message: "No Permited" });
        }
        if (client?.email !== tokenDecode.email) {
            return res.status(401).json({ message: "No Permited" });
        }
        next();
    }
};
exports.ClientMiddleware = ClientMiddleware;
