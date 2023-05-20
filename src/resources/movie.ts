export interface Movie {
  readonly _id: string;
  readonly name: string;
  readonly runtimeInMinutes: number;
  readonly budgetInMillions: number;
  readonly boxOfficeRevenueInMillions: number;
  readonly academyAwardNominations: number;
  readonly academyAwardWins: number;
  readonly rottenTomatoesScore: number;
}
