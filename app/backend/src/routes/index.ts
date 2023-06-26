import { Router } from 'express';
import TeamsRouter from './teams.routes';
import LoginRouter from './login.routes';
import MatchesRouter from './matches.routes';
import LeaderBoardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', LeaderBoardRouter);

export default router;
