import { Router } from "express";

import { categoriesRoutes } from "../../../../modules/cars/infra/http/routes/categories.routes";
import { specificationsRoutes } from "../../../../modules/cars/infra/http/routes/specifications.routes";

export const routes = Router();

routes.use("/categories", categoriesRoutes);

routes.use("/specifications", specificationsRoutes);
