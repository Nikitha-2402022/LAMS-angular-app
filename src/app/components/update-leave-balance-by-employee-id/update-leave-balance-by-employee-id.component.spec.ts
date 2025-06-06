import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveBalanceByEmployeeIdComponent } from './update-leave-balance-by-employee-id.component';

describe('UpdateLeaveBalanceByEmployeeIdComponent', () => {
  let component: UpdateLeaveBalanceByEmployeeIdComponent;
  let fixture: ComponentFixture<UpdateLeaveBalanceByEmployeeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLeaveBalanceByEmployeeIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLeaveBalanceByEmployeeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
