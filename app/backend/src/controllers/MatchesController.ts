import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response):
  Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.matchesService.getMatches(inProgress === 'true'); // se for igual a true, manda um boolean como true, se nao, como false
      return res.status(200).json(matches.data);
    }
    const matchesService = await this.matchesService.getAllMatches();
    return res.status(200).json(matchesService.data);
  }

  // public async changeMatche(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const changedMatche = await this.matchesService.changeMatche(id);
  //   res.status(200).json({ message: 'Finished' });
  // }
}
