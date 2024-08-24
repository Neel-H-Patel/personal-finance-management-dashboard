import { Routes } from '@angular/router';
import { BudgetPlannerComponent } from './features/budget-planner/budget-planner.component';
import { ExpenseTrackerComponent } from './features/expense-tracker/expense-tracker.component';
import { GoalTrackerComponent } from './features/goal-tracker/goal-tracker.component';

export const routes: Routes = [
    { path: 'budget', component: BudgetPlannerComponent },
    { path: 'expenses', component: ExpenseTrackerComponent },
    { path: 'goals', component: GoalTrackerComponent },
    { path: '', redirectTo: '/budget', pathMatch: 'full' },
    { path: '**', redirectTo: '/budget' },
];
