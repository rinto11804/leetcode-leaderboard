const SolutionPoints = {
  easy: 10,
  medium: 15,
  hard: 20,
};

export type SolvedCount = {
  easy: number;
  medium: number;
  hard: number;
};

export function calculatePoints(
  count: number,
  type: "easy" | "medium" | "hard"
) {
  return count * SolutionPoints[type];
}

export function calculateInitialPoints({
  easy,
  hard,
  medium,
}: SolvedCount): number {
  return (
    easy * SolutionPoints.easy +
    medium * SolutionPoints.medium +
    hard * SolutionPoints.hard
  );
}
