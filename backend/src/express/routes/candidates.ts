import { Router } from 'express';
import CandidateController from '../../controllers/CandidateController';
import CandidateService from '../../services/CandidateService';
import S3CandidateStore from '../../stores/S3CandidateStore';

const routes = (): Router => {
  const router = Router({ mergeParams: true });

  const store = new S3CandidateStore();
  const service = new CandidateService({ store });
  const candidateController = new CandidateController({ service });

  router.get('/', candidateController.list.bind(candidateController));

  return router;
};

export default routes;
