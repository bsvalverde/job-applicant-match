import { Router } from 'express';
import populateDatabase from '../../scripts/populateDatabase';
import candidateRoutes from './candidates';
import jobRoutes from './jobs';

const routes = (): Router => {
  const router = Router();

  router.use('/candidates', candidateRoutes());
  router.use('/jobs', jobRoutes());

  router.post('/populateDatabase', async (req, res, next) => {
    try {
      await populateDatabase();
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

export default routes;
