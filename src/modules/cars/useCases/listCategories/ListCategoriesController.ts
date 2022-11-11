import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {

  handle(req: Request, res: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const all = listCategoriesUseCase.execute();

    return res.json(all)
  }
}

export { ListCategoryController }