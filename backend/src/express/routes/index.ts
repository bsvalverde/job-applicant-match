import { Router } from 'express';
import populateDatabase from '../../scripts/populateDatabase';
import candidateRoutes from './candidates';

const routes = (): Router => {
  const router = Router();

  router.use('/candidates', candidateRoutes());

  router.post('/populateDatabase', async (req, res, next) => {
    await populateDatabase();
    res.sendStatus(200);
  });

  return router;
};

export default routes;
