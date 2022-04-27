import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", (req, res) => {
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/categories", (req, res) => {
  const all = categoriesRepository.list();

  return res.json(all)
})

export { categoriesRoutes }