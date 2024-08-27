import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { BudgetService } from './budget-planner.service';
import { Budget } from './budget-planner.model';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-budget-planner',
  standalone: true,
  imports: [FormsModule, NgxChartsModule, CommonModule],
  templateUrl: './budget-planner.component.html',
  styleUrl: './budget-planner.component.scss'
})
export class BudgetPlannerComponent implements OnInit {
  budgets: Budget[] = [];
  newBudget: Budget = { category: '', amount: 0, date: '' };
  budgetData: { name: string; value: number }[] = []; // Data format for the chart

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categories';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';
  // Correct definition of colorScheme
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // Example color array
  };

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgets().subscribe(budgets => {
      this.budgets = budgets;
      this.updateChartData(); // Update chart data whenever budgets are loaded
    });
  }

  addBudget(): void {
    this.budgetService.addBudget(this.newBudget).subscribe(budget => {
      this.budgets.push(budget);
      this.updateChartData(); // Update chart data whenever a new budget is added 
      this.newBudget = { category: '', amount: 0, date: '' }; // Clear form
    });
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => {
      this.budgets = this.budgets.filter(b => b.id !== id);
      this.updateChartData(); // Update chart data whenever a budget is deleted
    });
  }

  // Convert budgets into a format suitable for the chart
  updateChartData(): void { this.budgetData = this.budgets.map(b => ({ name: b.category, value: b.amount })); }

  // Add additional methods for editing if needed
}
