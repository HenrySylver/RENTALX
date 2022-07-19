import { accountsRoutes } from "@modules/accounts/infra/http/routes/accounts.routes";
import { categoriesRoutes } from "@modules/cars/infra/http/routes/categories.routes";
import { specificationsRoutes } from "@modules/cars/infra/http/routes/specifications.routes";
import { Router } from "express";

export const routes = Router();

routes.use("/categories", categoriesRoutes);

routes.use("/specifications", specificationsRoutes);

routes.use("/accounts", accountsRoutes);
