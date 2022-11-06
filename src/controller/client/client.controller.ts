import {
  ClientServices,
  Request,
  Response,
  UpdateClientModel,
} from "../conteroller.module";

export class ClientController {
  #services: ClientServices;

  constructor() {
    this.#services = new ClientServices();
  }

  getClient = async (req: Request, res: Response) => {
    const id = (req.user as any).id;
    const resp = await this.#services.getClientInfo(id);
    res.status(200).json(resp);
  };

  updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body as UpdateClientModel;
    const resp = await this.#services.patchClient(Number(id), body);
    res.status(200).json(resp);
  };

  deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resp = await this.#services.deleteClient(Number(id));
    res.status(200).json(resp);
  };
}
