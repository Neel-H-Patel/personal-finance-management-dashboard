import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from './expense-tracker.service';
import { Expense } from './expense-tracker.model';
import { CommonModule } from '@angular/common';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-expense',
  standalone: true,
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss'],
  imports: [FormsModule, CommonModule, NgxChartsModule]
})
export class ExpenseTrackerComponent implements OnInit {
  expenses: Expense[] = [];
  newExpense: Expense = { description: '', amount: 0, date: '' };
  expenseData: { name: string; value: number }[] = [];  // Data for the pie chart

  view: [number, number] = [700, 400];
  legend = true;
  explodeSlices = false;
  labels = true;
  doughnut = false;
  // Correct definition of colorScheme
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // Example color array
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.updateChartData();  // Update chart data whenever expenses are loaded
    });
  }

  addExpense(): void {
    this.expenseService.addExpense(this.newExpense).subscribe(expense => {
      this.expenses.push(expense);
      this.updateChartData();  // Update chart data whenever a new expense is added
      this.newExpense = { description: '', amount: 0, date: '' };  // Clear form
    });
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.expenses = this.expenses.filter(e => e.id !== id);
      this.updateChartData();  // Update chart data whenever an expense is deleted
    });
  }

  updateChartData(): void {
    this.expenseData = this.expenses.map(expense => ({
      name: expense.description,
      value: expense.amount
    }));
  }

  // Add additional methods for editing if needed
}
