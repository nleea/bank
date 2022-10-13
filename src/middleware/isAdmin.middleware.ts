import { Request, Response, NextFunction, prisma } from "./module.middleware";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuth = req.headers.authorization!;

  if (!headerAuth?.startsWith("Bearer")) {
    return res.status(401).json({ message: "No Permited" });
  }

  const token = headerAuth.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No Permited" });
  }

  const rol = await prisma.tbl_user.findUnique({
    where: { id: (req.user! as any).tbl_user_ID },
    include: { tbl_role: { select: { role: true } } },
  });
  
  if (rol?.tbl_role.role !== "admin") {
    return res.status(401).json({ message: "No permited" });
  }
  next();
};
