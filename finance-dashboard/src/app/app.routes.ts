import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BudgetPlannerComponent } from './components/budget-planner/budget-planner.component';
import { ExpenseTrackerComponent } from './components/expense-tracker/expense-tracker.component';
import { GoalTrackerComponent } from './components/goal-tracker/goal-tracker.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'budget-planner', component: BudgetPlannerComponent },
    { path: 'expense-tracker', component: ExpenseTrackerComponent },
    { path: 'goal-tracker', component: GoalTrackerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
