import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { BudgetService } from './budget-planner.service';
import { Budget } from './budget-planner.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-budget-planner',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './budget-planner.component.html',
  styleUrl: './budget-planner.component.scss'
})
export class BudgetPlannerComponent implements OnInit {
  budgets: Budget[] = [];
  newBudget: Budget = { category: '', amount: 0, date: '' };

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgets().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  addBudget(): void {
    this.budgetService.addBudget(this.newBudget).subscribe(budget => {
      this.budgets.push(budget);
      this.newBudget = { category: '', amount: 0, date: '' }; // Clear form
    });
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => {
      this.budgets = this.budgets.filter(b => b.id !== id);
    });
  }

  // Add additional methods for editing if needed
}
