import { Component, OnInit, signal } from '@angular/core';
import { GoalTrackerService } from '../../services/goal-tracker.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-goal-tracker',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgxChartsModule, NavbarComponent],
  templateUrl: './goal-tracker.component.html',
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit {
  goals = signal<any[]>([]);
  newGoalForm: FormGroup;
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
    this.goalService.getGoals().subscribe(
      goals => {
        console.log('Goals loaded:', goals); // Log loaded goals
        this.goals.set(goals);
        this.updateChartData();
      },
      error => {
        console.error('Error loading goals:', error); // Log any errors
      }
    );
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

  updateChartData() {
    const goalData = this.goals().map(goal => {
      const progress = (goal.current_amount / goal.target_amount) * 100; // Calculate progress percentage
      return {
        name: goal.name, // Assuming each goal has a 'name' property
        value: progress // Progress as a percentage
      };
    });

    this.chartData = goalData;
  }
}