import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveBalanceByLeaveIdComponent } from './update-leave-balance-by-leave-id.component';

describe('UpdateLeaveBalanceByLeaveIdComponent', () => {
  let component: UpdateLeaveBalanceByLeaveIdComponent;
  let fixture: ComponentFixture<UpdateLeaveBalanceByLeaveIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLeaveBalanceByLeaveIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLeaveBalanceByLeaveIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
