import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];
 
  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      description,
      name
    })

    this.specifications.push(specification)

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(specification => specification.name === name)
  }

  async findByids(ids: string[]): Promise<Specification[]> {
    const allSpecificationsd = this.specifications.filter((specification) => ids.includes(specification.id))

    return allSpecificationsd;
  }
}

export { SpecificationRepositoryInMemory }