import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BudgetPlannerComponent } from './components/budget-planner/budget-planner.component';
import { ExpenseTrackerComponent } from './components/expense-tracker/expense-tracker.component';
import { GoalTrackerComponent } from './components/goal-tracker/goal-tracker.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'budget-planner', component: BudgetPlannerComponent, canActivate: [AuthGuard] },
    { path: 'expense-tracker', component: ExpenseTrackerComponent, canActivate: [AuthGuard] },
    { path: 'goal-tracker', component: GoalTrackerComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
