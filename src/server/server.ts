import App, { Application } from "express";
import morgan from "morgan";
import { IndexRouter } from "../routes/index.routes";
import SwaggerUi from "swagger-ui-express";
import SwaggerDocument from "../../swagger.json";
import helmet from "helmet";

export class Server {
  #app: Application;

  constructor() {
    this.#app = App();
    this.#middleware();
    this.#routes();
  }

  #middleware() {
    this.#app.set("port", process.env.PORT || 3000);
    this.#app.use(App.json());
    this.#app.use(App.urlencoded({ extended: false }));
    this.#app.use(morgan("dev"));
    this.#app.use(helmet());
  }

  #routes() {
    var options_ = {
      explorer: true,
    };

    this.#app.use("/api/", new IndexRouter().routes());
    this.#app.use(
      "/api-doc/",
      SwaggerUi.serve,
      SwaggerUi.setup(SwaggerDocument, options_)
    );
  }

  listen() {
    this.#app.listen(this.#app.get("port"), () => {
      console.log("Server on port: ", this.#app.get("port"));
    });
  }
}
