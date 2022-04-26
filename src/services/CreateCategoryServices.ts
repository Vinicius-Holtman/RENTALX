import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/*
* [x] - Definir o tipo de retorno
* [x] - Definir o retorno de erro
* [x] - Acessar o repositorio
*/
class CreateCategoryServices {
  constructor(private categoriesRepository: CategoriesRepository) {}
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already axists!")
    }
  
    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryServices }