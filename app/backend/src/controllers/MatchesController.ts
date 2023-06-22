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

  public async updateProgressMatche(req: Request, res: Response) {
    const { id } = req.params;
    const changedMatche = await this.matchesService.updateProgressMatche(id);
    res.status(200).json(changedMatche.data);
  }

  public async updateMatche(req:Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const matche = await this.matchesService.updateMatche(id, homeTeamGoals, awayTeamGoals);
    res.status(200).json(matche.data);
  }

  public async createMatche(req: Request, res: Response) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    const newMatcheDb = await this.matchesService.createMatche(req.body);
    if (newMatcheDb.status === 'NOT_FOUND') {
      return res.status(404).json(newMatcheDb.data);
    }
    return res.status(201).json(newMatcheDb.data);
  }
}
