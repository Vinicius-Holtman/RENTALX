import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post("/specifications", (req, res) => {
  return createSpecificationController.handle(req, res)
})

export { specificationsRoutes }