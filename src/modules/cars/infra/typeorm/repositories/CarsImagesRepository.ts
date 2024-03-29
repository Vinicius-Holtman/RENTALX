import { getRepository, Repository } from "typeorm";
import { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";


class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const CarImage = this.repository.create({
      car_id,
      image_name
    })

    await this.repository.save(CarImage)

    return CarImage;
  }

}

export { CarsImagesRepository }