import { Router } from 'express';

const routes = (): Router => {
  const router = Router({ mergeParams: true });

  router.get('/', (req, res, next) => res.json('ok!'));

  return router;
};

export default routes;
