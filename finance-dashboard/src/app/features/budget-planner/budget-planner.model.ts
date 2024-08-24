export interface Budget {
    id?: number;           // Optional ID for existing items
    category: string;     // Budget category (e.g., "Food", "Utilities")
    amount: number;       // Budgeted amount
    date: string;         // Date of the budget entry
}