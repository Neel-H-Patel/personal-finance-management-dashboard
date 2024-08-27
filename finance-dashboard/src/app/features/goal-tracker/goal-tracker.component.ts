import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { GoalService } from './goal-tracker.service';
import { Goal } from './goal-tracker.model';
import { CommonModule } from '@angular/common';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-goal',
  standalone: true,
  templateUrl: './goal-tracker.component.html',
  styleUrls: ['./goal-tracker.component.scss'],
  imports: [FormsModule, CommonModule, NgxChartsModule]
})
export class GoalTrackerComponent implements OnInit {
  goals: Goal[] = [];
  newGoal: Goal = { title: '', targetAmount: 0, currentAmount: 0, deadline: '' };
  goalProgressData: { name: string; value: number }[] = [];

  // Chart configuration variables
  view: [number, number] = [600, 400]; // Chart width and height
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // Example color array
  };
  xAxisLabel = 'Progress (%)';
  yAxisLabel = 'Goals';

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.goalService.getGoals().subscribe(goals => {
      this.goals = goals;
      this.updateChartData(); // Update chart data whenever goals are loaded
    });
  }

  addGoal(): void {
    this.goalService.addGoal(this.newGoal).subscribe(goal => {
      this.goals.push(goal);
      this.updateChartData(); // Update chart data whenever a new goal is added
      this.newGoal = { title: '', targetAmount: 0, currentAmount: 0, deadline: '' }; // Clear form
    });
  }

  deleteGoal(id: number): void {
    this.goalService.deleteGoal(id).subscribe(() => {
      this.goals = this.goals.filter(g => g.id !== id);
      this.updateChartData(); // Update chart data whenever a goal is deleted
    });
  }

  updateChartData(): void {
    this.goalProgressData = this.goals.map(goal => ({
        name: goal.title,
        value: (goal.currentAmount / goal.targetAmount) * 100 // Calculate progress as a percentage
    }));
  }

  // Additional methods for updating or editing goals if needed
}
