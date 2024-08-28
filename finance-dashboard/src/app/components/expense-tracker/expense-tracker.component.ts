import { Component, OnInit, signal } from '@angular/core';
import { ExpenseTrackerService } from '../../services/expense-tracker.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss']
})
export class ExpenseTrackerComponent implements OnInit {
  expenses = signal<any[]>([]);
  newExpenseForm: FormGroup;

  constructor(private expenseService: ExpenseTrackerService, private fb: FormBuilder) {
    this.newExpenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => this.expenses.set(expenses));
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
}