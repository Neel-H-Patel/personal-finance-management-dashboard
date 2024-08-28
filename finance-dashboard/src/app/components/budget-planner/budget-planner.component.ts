import { Component, OnInit, signal } from '@angular/core';
import { BudgetPlannerService } from '../../services/budget-planner.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-planner',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './budget-planner.component.html',
  styleUrls: ['./budget-planner.component.scss']
})
export class BudgetPlannerComponent implements OnInit {
  budgets = signal<any[]>([]);
  newBudgetForm: FormGroup;

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
    this.budgetService.getBudgets().subscribe(budgets => this.budgets.set(budgets));
    console.log('Budgets loaded:', this.budgets());
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
}