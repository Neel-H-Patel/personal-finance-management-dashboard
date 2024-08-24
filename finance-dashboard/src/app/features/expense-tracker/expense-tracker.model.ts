export interface Expense {
    id?: number;           // Optional ID for existing expenses
    description: string;  // Description of the expense
    amount: number;       // Amount of the expense
    date: string;         // Date of the expense
}