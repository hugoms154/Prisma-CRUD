import "reflect-metadata";
import { configServer, runServer } from "./api/server";

const server = configServer();

runServer(server)
  .then(() => console.log("Server is running at http://localhost:4000/"))
  .catch((err: Error) => console.log(err));
