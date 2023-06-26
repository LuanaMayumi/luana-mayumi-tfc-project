import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();
const leaderBoard = new LeaderBoardController();

router.get(
  '/home',
  (
    req: Request,
    res: Response,
  ) => {
    leaderBoard.getLeaderBoard(req, res);
  },
);

export default router;
