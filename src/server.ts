import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.listen(3333, () => console.log("Server is Running on PORT 3333"));

app.use(express.json());

app.use("/categories", categoriesRoutes);
<<<<<<< HEAD

=======
>>>>>>> ef618148756b11d2d051c9b16549bd4fb8a01cf0
app.use("/specifications", specificationsRoutes);
