import { Component, OnInit, signal } from '@angular/core';
import { GoalTrackerService } from '../../services/goal-tracker.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal-tracker',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './goal-tracker.component.html',
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit {
  goals = signal<any[]>([]);
  newGoalForm: FormGroup;

  constructor(private goalService: GoalTrackerService, private fb: FormBuilder) {
    this.newGoalForm = this.fb.group({
      name: ['', Validators.required],
      target_amount: [0, Validators.required],
      current_amount: [0, Validators.required],
      due_date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadGoals();
  }

  loadGoals() {
    this.goalService.getGoals().subscribe(goals => this.goals.set(goals));
  }

  addGoal() {
    if (this.newGoalForm.valid) {
      this.goalService.addGoal(this.newGoalForm.value).subscribe(() => {
        this.loadGoals();
        this.newGoalForm.reset();
      });
    }
  }

  deleteGoal(id: number) {
    this.goalService.deleteGoal(id).subscribe(() => {
      this.loadGoals();
    });
  }
}