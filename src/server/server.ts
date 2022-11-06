import App, { Application } from "express";
import session from "express-session";
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
    this.#app.use(
      session({
        resave: true,
        secret: process.env.SECRET_OR_KEY!,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
    this.#app.use(helmet());
    this.#app.use(cors());
    this.#app.use(App.json());
    this.#app.use(App.urlencoded({ extended: false }));
    this.#app.use(morgan("dev"));
  }

  #routes() {
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
