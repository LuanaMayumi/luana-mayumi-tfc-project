import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();
const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getOneTeam(req, res));

export default router;
