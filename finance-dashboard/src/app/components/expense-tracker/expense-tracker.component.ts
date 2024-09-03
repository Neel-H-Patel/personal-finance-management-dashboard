import { Component, OnInit, signal } from '@angular/core';
import { ExpenseTrackerService } from '../../services/expense-tracker.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgxChartsModule, NavbarComponent],
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss']
})
export class ExpenseTrackerComponent implements OnInit {
  expenses = signal<any[]>([]);
  newExpenseForm: FormGroup;
  chartData: any[] = [];
  view: [number, number] = [800, 400]; // Width and height of the chart

  // Options for the chart
  showLegend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0']
  };

  constructor(private expenseService: ExpenseTrackerService, private fb: FormBuilder) {
    const today = new Date().toISOString().split('T')[0];
    this.newExpenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, Validators.required],
      category: ['', Validators.required],
      date: [today, Validators.required]
    });
  }

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(
      expenses => {
        this.expenses.set(expenses);
        this.updateChartData();
      },
      error => {
        console.error('Error loading expenses:', error); // Log any errors
      }
    );
  }

  addExpense() {
    if (this.newExpenseForm.valid) {
      this.expenseService.addExpense(this.newExpenseForm.value).subscribe(() => {
        this.loadExpenses();
        this.newExpenseForm.reset();
      });
    }
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }

  updateChartData() {
    const expenseDataByCategory: { [key: string]: number } = {};

    this.expenses().forEach(expense => {
      const category = expense.category;
      if (!expenseDataByCategory[category]) {
        expenseDataByCategory[category] = 0;
      }
      expenseDataByCategory[category] += expense.amount;
    });

    const formattedData = Object.keys(expenseDataByCategory).map(category => ({
      name: category,
      value: expenseDataByCategory[category]
    }));

    this.chartData = formattedData;
  }
}