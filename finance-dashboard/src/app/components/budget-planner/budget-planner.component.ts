import { Component, OnInit, signal } from '@angular/core';
import { BudgetPlannerService } from '../../services/budget-planner.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Color, ScaleType, NgxChartsModule } from '@swimlane/ngx-charts';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-budget-planner',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgxChartsModule, NavbarComponent],
  templateUrl: './budget-planner.component.html',
  styleUrls: ['./budget-planner.component.scss']
})
export class BudgetPlannerComponent implements OnInit {
  budgets = signal<any[]>([]);
  newBudgetForm: FormGroup;
  chartData: any[] = [];
  view: [number, number] = [800, 400]; // Width and height of the chart

  // Options for the chart
  showLegend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0']
  };

  constructor(private budgetService: BudgetPlannerService, private fb: FormBuilder) {
    const today = new Date().toISOString().split('T')[0];
    this.newBudgetForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, Validators.required],
      start_date: [today, Validators.required],
      end_date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.budgetService.getBudgets().subscribe(
      budgets => {
        console.log('Budgets loaded:', budgets); // Log loaded budgets
        this.budgets.set(budgets);
        this.updateChartData();
      },
      error => {
        console.error('Error loading budgets:', error); // Log any errors
      }
    );
  }

  addBudget() {
    if (this.newBudgetForm.valid) {
      const budgetData = this.newBudgetForm.value;
      console.log('Sending budget data:', budgetData);  // Log the form data
      this.budgetService.addBudget(budgetData).subscribe(
        () => {
          this.loadBudgets();
          this.newBudgetForm.reset();
        },
        (error) => {
          console.error('Error adding budget:', error);  // Log the error response
        }
      );
    }
  }

  deleteBudget(id: number) {
    if (id) {  // Check if the ID is valid
      this.budgetService.deleteBudget(id).subscribe(
        () => {
          this.loadBudgets();  // Refresh the list after successful deletion
        },
        (error) => {
          console.error('Error deleting budget:', error);  // Log error
        }
      );
    } else {
      console.error('Invalid budget ID:', id);  // Log the issue for debugging
    }
  }

  updateChartData() {
    const budgetDataByCategory: { [key: string]: number } = {};

    this.budgets().forEach(budget => {
      const category = budget.name; // Assuming each budget has a 'name' property for the category
      if (!budgetDataByCategory[category]) {
        budgetDataByCategory[category] = 0;
      }
      budgetDataByCategory[category] += budget.amount;
    });

    const formattedData = Object.keys(budgetDataByCategory).map(category => ({
      name: category,
      value: budgetDataByCategory[category]
    }));

    this.chartData = formattedData;
  }
}