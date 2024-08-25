import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule and CommonModule
import { GoalService } from './goal-tracker.service';
import { Goal } from './goal-tracker.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal',
  standalone: true,
  templateUrl: './goal-tracker.component.html',
  styleUrls: ['./goal-tracker.component.scss'],
  imports: [FormsModule, CommonModule]  // Add FormsModule and CommonModule here
})
export class GoalTrackerComponent implements OnInit {
  goals: Goal[] = [];
  newGoal: Goal = { title: '', targetAmount: 0, currentAmount: 0, deadline: '' };

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.goalService.getGoals().subscribe(goals => {
      this.goals = goals;
    });
  }

  addGoal(): void {
    this.goalService.addGoal(this.newGoal).subscribe(goal => {
      this.goals.push(goal);
      this.newGoal = { title: '', targetAmount: 0, currentAmount: 0, deadline: '' }; // Clear form
    });
  }

  deleteGoal(id: number): void {
    this.goalService.deleteGoal(id).subscribe(() => {
      this.goals = this.goals.filter(g => g.id !== id);
    });
  }

  // Add additional methods for updating or editing if needed
}
