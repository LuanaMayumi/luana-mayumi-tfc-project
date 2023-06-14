import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const teamsService = await this.teamsService.getAllTeams();
    res.status(200).json(teamsService.data);
  }
}
