import { AuthCases, Request, Response } from "../conteroller.module";
import { AuthModel } from "../../models/auth.model";
import { ClientModel } from "../../models/client.model";

export class AuthController {
  #authServices: AuthCases;

  constructor() {
    this.#authServices = new AuthCases();
  }

  register = async (req: Request, res: Response) => {
    const body = req.body as ClientModel;
    const resp = await this.#authServices.register(body);
    return res.status(resp.code).json(resp.data);
  };

  login = async (req: Request, res: Response) => {
    const body = req.body as AuthModel;
    const resp = await this.#authServices.authClient(body);
    return res.status(resp.code).json(resp.data);
  };
}
