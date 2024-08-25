import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule and CommonModule
import { ExpenseService } from './expense-tracker.service';
import { Expense } from './expense-tracker.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense',
  standalone: true,
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss'],
  imports: [FormsModule, CommonModule]  // Add FormsModule and CommonModule here
})
export class ExpenseTrackerComponent implements OnInit {
  expenses: Expense[] = [];
  newExpense: Expense = { description: '', amount: 0, date: '' };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  addExpense(): void {
    this.expenseService.addExpense(this.newExpense).subscribe(expense => {
      this.expenses.push(expense);
      this.newExpense = { description: '', amount: 0, date: '' }; // Clear form
    });
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.expenses = this.expenses.filter(e => e.id !== id);
    });
  }

  // Add additional methods for editing if needed
}
