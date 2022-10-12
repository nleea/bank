import { ClientRepository, UpdateClientModel } from "../usesCases.module";

export class ClientServices {
  #clientService: ClientRepository;

  constructor() {
    this.#clientService = new ClientRepository();
  }

  async getClientInfo(id: number) {
    const resp = await this.#clientService.getClient({ id: id });
    return resp;
  }

  async patchClient(id: number, body: UpdateClientModel) {
    const resp = await this.#clientService.updateClient(id, body);
    return resp;
  }

  async deleteClient(id: number) {
    const resp = await this.#clientService.deleteClient(id);
    return resp;
  }
}
