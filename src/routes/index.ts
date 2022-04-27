import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.routes";

const router = Router()

router.use(categoriesRoutes)
router.use(specificationsRoutes)

export { router }

