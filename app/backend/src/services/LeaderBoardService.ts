import IMatche from '../Interfaces/Matche';
import MatchesModel from '../models/MatchesModel';
import ILeaderBoard from '../Interfaces/LeaderBoard';

export default class LeaderBoardService {
  constructor(
    private matchesModel = new MatchesModel(),
  ) {}

  private static creatingLeaderBoard(teamName: string): ILeaderBoard {
    return {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    };
  }

  private static updateLeaderBoard(team: IMatche, finalObject: ILeaderBoard): void {
    const object = finalObject;
    object.totalGames += 1;
    object.goalsFavor += team.homeTeamGoals;
    object.goalsOwn += team.awayTeamGoals;
    if (team.homeTeamGoals > team.awayTeamGoals) {
      object.totalPoints += 3;
      object.totalVictories += 1;
    }
    if (team.awayTeamGoals > team.homeTeamGoals) object.totalLosses += 1;
    if (team.homeTeamGoals === team.awayTeamGoals) {
      object.totalDraws += 1;
      object.totalPoints += 1;
    }

    object.goalsBalance += team.homeTeamGoals - team.awayTeamGoals;

    object.efficiency = ((
      object.totalPoints / (object.totalGames * 3)) * 100).toFixed(2).toString();
  }

  private static orderingResult(finalObject: ILeaderBoard[]): void {
    finalObject.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
  }

  public async getLeaderBoard(): Promise<ILeaderBoard[]> {
    const allTeams = await this.matchesModel.get(false);

    const finalObject: {
      [teamName: string]: ILeaderBoard
    } = {};

    allTeams.forEach((team) => {
      const teamName = team.homeTeam?.teamName;
      if (teamName !== undefined && !finalObject[teamName]) {
        finalObject[teamName] = LeaderBoardService.creatingLeaderBoard(teamName);
      }
      if (teamName && finalObject[teamName]) {
        LeaderBoardService.updateLeaderBoard(team, finalObject[teamName]);
      }
    });
    const valueObject = Object.values(finalObject);
    LeaderBoardService.orderingResult(valueObject);
    return valueObject;
  }
}
