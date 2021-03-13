import { Router } from 'express';
import JobController from '../../controllers/JobController';
import JobService from '../../services/JobService';
import MongoJobStore from '../../stores/MongoJobStore';

const routes = (): Router => {
  const router = Router({ mergeParams: true });

  const store = new MongoJobStore();
  const service = new JobService({ store });
  const jobController = new JobController({ service });

  router.get('/', jobController.list.bind(jobController));

  return router;
};

export default routes;
