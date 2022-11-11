import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const createSpecificationController = new CreateSpecificationController()

const specificationsRoutes = Router();

specificationsRoutes.post("/specifications", createSpecificationController.handle)

export { specificationsRoutes }