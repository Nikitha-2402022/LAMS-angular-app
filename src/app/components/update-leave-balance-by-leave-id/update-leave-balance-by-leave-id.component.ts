import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LeaveBalanceService } from '../../services/leave-balance.service';
import { LeaveBalanceDTO } from '../../models/leave-balance.dto';
import { NgIf, CommonModule } from '@angular/common'; // CommonModule for NgIf
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]

@Component({
  selector: 'lams-update-leave-balance-by-id',
  templateUrl: './update-leave-balance-by-leave-id.component.html',
  styleUrls: ['./update-leave-balance-by-leave-id.component.css'],
  imports: [
    CommonModule, 
    FormsModule,  
    RouterModule 
  ]
})
export class UpdateLeaveBalanceByLeaveIdComponent implements OnInit {
  leaveBalanceId: number | null = null;
  leaveBalance: LeaveBalanceDTO = {
    employeeId: 0,
    leaveType: '',
    balance: 0
  };
  originalLeaveBalance: LeaveBalanceDTO | null = null; 
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaveBalanceService: LeaveBalanceService
  ) { }

  ngOnInit(): void {
    console.log('UpdateLeaveBalanceByIdComponent: Initializing...');
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('UpdateLeaveBalanceByIdComponent: Raw ID from URL paramMap:', idParam);

    if (idParam) {
      this.leaveBalanceId = Number(idParam);

      if (!Number.isNaN(this.leaveBalanceId)) {
        console.log('UpdateLeaveBalanceByIdComponent: Parsed Leave Balance ID:', this.leaveBalanceId);
        this.isLoading = true; 
        this.leaveBalanceService.getLeaveBalanceByLeaveBalanceId(this.leaveBalanceId).subscribe({
          next: (data) => {
            this.leaveBalance = { ...data }; 
            this.originalLeaveBalance = { ...data }; 
            this.successMessage = 'Leave balance data loaded.';
            this.errorMessage = ''; 
            this.isLoading = false; 
            console.log('UpdateLeaveBalanceByLeaveIdComponent: Leave Balance fetched successfully:', this.leaveBalance);
          },
          error: (err) => {
            console.error('UpdateLeaveBalanceByLeaveIdComponent: Error fetching leave balance by ID:', err);
            this.isLoading = false;
            if (err.status === 404) {
              this.errorMessage = 'Leave balance not found. It might have been deleted or the ID is incorrect.';
            } else if (err.status === 400) {
              this.errorMessage = 'Bad request while fetching data.';
            } else {
              this.errorMessage = 'Failed to load leave balance for editing. Please check your network and backend.';
            }
          }
        });
      } else {
        this.errorMessage = 'Invalid Leave Balance ID provided in the URL. ID must be a number.';
        this.isLoading = false; 
        console.error('UpdateLeaveBalanceByLeaveIdComponent: Invalid ID parsed, NaN:', this.leaveBalanceId);
      }
    } else {
      this.errorMessage = 'No Leave Balance ID found in the URL. Cannot update.';
      this.isLoading = false; 
      console.error('UpdateLeaveBalanceByLeaveIdComponent: No ID parameter found in route for update.');
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    console.log('UpdateLeaveBalanceByLeaveIdComponent: Submitting form...');


    if (this.leaveBalanceId && !Number.isNaN(this.leaveBalanceId)) {
      console.log('UpdateLeaveBalanceByLeaveIdComponent: Attempting to update Leave Balance ID:', this.leaveBalanceId, 'with data:', this.leaveBalance);
      this.leaveBalanceService.updateLeaveBalanceByLeaveId(this.leaveBalanceId, this.leaveBalance).subscribe({
        next: (data) => {
          this.successMessage = 'Leave Balance updated successfully!';
          this.errorMessage = '';
          console.log('UpdateLeaveBalanceByLeaveIdComponent: Update successful:', data);
          setTimeout(() => {
            this.router.navigate(['/leave-balances']);
          }, 1500); 
        },
        error: (err) => {
          console.error('UpdateLeaveBalanceByLeaveIdComponent: Error updating leave balance by ID', err);
          if (err.status === 400) {
              this.errorMessage = 'Failed to update: Invalid input data. Please check your fields.';
          } else if (err.status === 404) {
              this.errorMessage = 'Failed to update: Leave balance not found. It might have been deleted.';
          } else if (err.status === 409) { 
              this.errorMessage = 'Failed to update: A conflict occurred (e.g., concurrent update).';
          }
          else {
              this.errorMessage = 'Failed to update leave balance. An unexpected error occurred. Please try again.';
          }
        }
      });
    } else {
      this.errorMessage = 'Cannot update: Invalid or missing Leave Balance ID.';
      console.error('UpdateLeaveBalanceByIdComponent: Update attempt with invalid/missing Leave Balance ID:', this.leaveBalanceId);
    }
  }

  isFormDirty(): boolean {
    if (!this.originalLeaveBalance) return false;

    return (
      this.leaveBalance.employeeId !== this.originalLeaveBalance.employeeId ||
      this.leaveBalance.leaveType !== this.originalLeaveBalance.leaveType ||
      this.leaveBalance.balance !== this.originalLeaveBalance.balance
    );
  }
  isInvalidId(): boolean {
    return this.leaveBalanceId === null || Number.isNaN(this.leaveBalanceId);
  }
}