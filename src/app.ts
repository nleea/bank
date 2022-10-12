import dotenv from "dotenv";

dotenv.config();

import("./server/server")
  .then((s) => {
    const server = new s.Server();
    server.listen();
  })
  .catch((e) => {
    console.log(e);
  });
