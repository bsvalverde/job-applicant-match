import { Router } from 'express';

const routes = (): Router => {
  const router = Router({ mergeParams: true });

  router.get('/all', (req, res, next) => res.json('ok!'));

  return router;
};

export default routes;
