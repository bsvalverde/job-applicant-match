import { Router } from 'express';
import candidateRoutes from './candidates';

const routes = (): Router => {
  const router = Router();

  router.use('/candidates', candidateRoutes());

  return router;
};

export default routes;
