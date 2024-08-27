import { Routes } from '@angular/router';
import { BudgetPlannerComponent } from './features/budget-planner/budget-planner.component';
import { ExpenseTrackerComponent } from './features/expense-tracker/expense-tracker.component';
import { GoalTrackerComponent } from './features/goal-tracker/goal-tracker.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    { path: 'budget', component: BudgetPlannerComponent },
    { path: 'expenses', component: ExpenseTrackerComponent },
    { path: 'goals', component: GoalTrackerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
    { path: '**', redirectTo: '/login' },
];
