import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryServices } from '../modules/cars/services/CreateCategoryServices';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryServices(categoriesRepository)

  createCategoryService.execute({ name, description })
  return res.status(201).send();
})

categoriesRoutes.get("/categories", (req, res) => {
  const all = categoriesRepository.list();

  return res.json(all)
})

export { categoriesRoutes }