import { Router } from "express";

import { usersRoutes } from "../../../../modules/accounts/infra/http/routes/users.routes";
import { categoriesRoutes } from "../../../../modules/cars/infra/http/routes/categories.routes";
import { specificationsRoutes } from "../../../../modules/cars/infra/http/routes/specifications.routes";

export const routes = Router();

routes.use("/categories", categoriesRoutes);

routes.use("/specifications", specificationsRoutes);

routes.use("/users", usersRoutes);
