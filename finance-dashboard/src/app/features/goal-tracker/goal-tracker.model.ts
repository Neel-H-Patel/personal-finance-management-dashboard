export interface Goal {
    id?: number;           // Optional ID for existing goals
    title: string;        // Title of the goal
    targetAmount: number; // Target amount for the goal
    currentAmount: number; // Current amount towards the goal
    deadline: string;     // Deadline for the goal
  }