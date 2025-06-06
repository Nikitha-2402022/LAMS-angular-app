import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceByEmployeeIdComponent } from './leave-balance-by-employee-id.component';

describe('LeaveBalanceByEmployeeIdComponent', () => {
  let component: LeaveBalanceByEmployeeIdComponent;
  let fixture: ComponentFixture<LeaveBalanceByEmployeeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveBalanceByEmployeeIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBalanceByEmployeeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
