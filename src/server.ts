import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "./shared/container";
import "./database";
import { routes } from "./shared/infra/http/routes";
import swaggerFile from "./swagger.json";
import "express-async-errors";

const app = express();

app.use(express.json());

app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, () => console.log("Server is Running on PORT 3333"));
