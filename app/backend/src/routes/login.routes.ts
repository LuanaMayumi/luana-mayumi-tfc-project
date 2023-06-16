import { Router, Request, Response } from 'express';
import ValidateToken from '../middlewares/ValidateToken';
import ValidateLogin from '../middlewares/ValidateLogin';
import UserController from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post(
  '/',
  ValidateLogin.validate,
  (req: Request, res: Response) => {
    userController.login(req, res);
  },
);
router.get(
  '/role',
  ValidateToken.validate,
  (req: Request, res: Response) => {
    userController.loginRole(req, res);
  },
);

export default router;
