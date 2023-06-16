import { Router } from 'express';
import TeamsRouter from './teams.routes';
import LoginRouter from './login.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);
// router.use('/login/role', LoginRouter);

export default router;
