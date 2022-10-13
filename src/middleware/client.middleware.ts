import { Request, Response, NextFunction, prisma } from "./module.middleware";
import { verify } from "jsonwebtoken";

export const ClientMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rol = await prisma.tbl_user.findUnique({
    where: { id: (req.user! as any).tbl_user_ID },
    include: { tbl_role: { select: { role: true } } },
  });

  if (rol?.tbl_role.role === "admin") {
    next();
  } else {
    const headerAuth = req.headers.authorization!;

    if (!headerAuth?.startsWith("Bearer")) {
      return res.status(401).json({ message: "No Permited" });
    }

    const token = headerAuth.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No Permited" });
    }

    const tokenDecode = verify(token, process.env.SECRET_OR_KEY!) as any;

    const { id } = req.params;

    const client = await prisma.tbl_client.findUnique({
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
