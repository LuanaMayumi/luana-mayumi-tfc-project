import { Request, Response, Router } from 'express';
import ValidateToken from '../middlewares/ValidateToken';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();
const router = Router();

router.get('/', (
  req: Request,
  res: Response,
) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  ValidateToken.validate,
  (
    req: Request,
    res: Response,
  ) => matchesController.updateProgressMatche(req, res),
);

router.patch(
  '/:id',
  ValidateToken.validate,
  (
    req: Request,
    res: Response,
  ) => matchesController.updateMatche(req, res),
);

router.post(
  '/',
  ValidateToken.validate,
  (
    req: Request,
    res: Response,
  ) => matchesController.createMatche(req, res),
);

export default router;
