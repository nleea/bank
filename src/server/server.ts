import App, { Application } from "express";
import morgan from "morgan";
import { IndexRouter } from "../routes/index.routes";
import SwaggerUi from "swagger-ui-express";
import SwaggerDocument from "../../swagger.json";
import helmet from "helmet";
import cors from "cors";

export class Server {
  #app: Application;

  constructor() {
    this.#app = App();
    this.#middleware();
    this.#routes();
  }

  #middleware() {
    this.#app.set("port", process.env.PORT || 3000);
    this.#app.use(helmet());
    this.#app.use(cors());
    this.#app.use(App.json());
    this.#app.use(App.urlencoded({ extended: false }));
    this.#app.use(morgan("dev"));
  }

  #routes() {
    var options_ = {
      explorer: true,
    };

    this.#app.use("/api/", new IndexRouter().routes());
    this.#app.use(
      "/api-doc/",
      SwaggerUi.serve,
      SwaggerUi.setup(SwaggerDocument)
    );
  }

  listen() {
    this.#app.listen(this.#app.get("port"), () => {
      console.log("Server on port: ", this.#app.get("port"));
    });
  }
}
