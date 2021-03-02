import { Router } from 'express';
import openingRoutes from './openings';

const routes = (): Router => {
  const router = Router();

  router.use('/openings', openingRoutes());

  return router;
};

export default routes;
