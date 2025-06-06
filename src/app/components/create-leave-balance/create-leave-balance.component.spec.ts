import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLeaveBalanceComponent } from './create-leave-balance.component';

describe('CreateLeaveBalanceComponent', () => {
  let component: CreateLeaveBalanceComponent;
  let fixture: ComponentFixture<CreateLeaveBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeaveBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeaveBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
