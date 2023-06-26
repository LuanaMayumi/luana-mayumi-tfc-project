import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  public async getLeaderBoard(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard();
    return res.status(200).json(leaderBoard);
  }
}
