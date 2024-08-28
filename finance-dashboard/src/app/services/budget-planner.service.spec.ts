import { TestBed } from '@angular/core/testing';

import { BudgetPlannerService } from './budget-planner.service';

describe('BudgetPlannerService', () => {
  let service: BudgetPlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetPlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
