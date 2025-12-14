declare module "javascript-lp-solver" {
  type SolveResult = {
    feasible: boolean;
    result: number;
    [key: string]: number | boolean | undefined;
  };

  const solver: {
    Solve(model: any): SolveResult;
  };

  export default solver;
}
