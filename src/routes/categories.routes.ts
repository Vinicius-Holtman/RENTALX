import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: "Category Already Exists! 😩"})
  }

  categoriesRepository.create({ name, description })

  return res.status(201).send();
})

categoriesRoutes.get("/categories", (req, res) => {
  const all = categoriesRepository.list();

  return res.json(all)
})

export { categoriesRoutes }