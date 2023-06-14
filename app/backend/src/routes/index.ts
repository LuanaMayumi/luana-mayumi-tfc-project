import { Router } from 'express';
import TeamsRouter from './teams.routes';

const router = Router();

router.use('/teams', TeamsRouter);

export default router;
