"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const module_middleware_1 = require("./module.middleware");
const isAdmin = async (req, res, next) => {
    const headerAuth = req.headers.authorization;
    if (!headerAuth?.startsWith("Bearer")) {
        return res.status(401).json({ message: "No Permited" });
    }
    const token = headerAuth.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No Permited" });
    }
    const rol = await module_middleware_1.prisma.tbl_user.findUnique({
        where: { id: req.user.tbl_user_ID },
        include: { tbl_role: { select: { role: true } } },
    });
    if (rol?.tbl_role.role !== "admin") {
        return res.status(401).json({ message: "No permited" });
    }
    next();
};
exports.isAdmin = isAdmin;
