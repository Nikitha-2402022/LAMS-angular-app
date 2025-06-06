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
    CommonModule, // Provides *ngIf
    FormsModule,  // Provides [(ngModel)]
    RouterModule // Provides routerLink if used in template (e.g., for a "Cancel" button)
  ]
})
export class UpdateLeaveBalanceByIdComponent implements OnInit {
  leaveBalanceId: number | null = null;
  leaveBalance: LeaveBalanceDTO = {
    employeeId: 0,
    leaveType: '',
    balance: 0
  };
  originalLeaveBalance: LeaveBalanceDTO | null = null; // To store original for comparison
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true; // To manage loading state

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

      // FIX: Use Number.isNaN() instead of global isNaN()
      if (!Number.isNaN(this.leaveBalanceId)) {
        console.log('UpdateLeaveBalanceByIdComponent: Parsed Leave Balance ID:', this.leaveBalanceId);
        this.isLoading = true; // Start loading state
        this.leaveBalanceService.getLeaveBalanceByLeaveBalanceId(this.leaveBalanceId).subscribe({
          next: (data) => {
            this.leaveBalance = { ...data }; // Copy to avoid direct modification
            this.originalLeaveBalance = { ...data }; // Store original for comparison
            this.successMessage = 'Leave balance data loaded.';
            this.errorMessage = ''; // Clear any previous errors
            this.isLoading = false; // End loading state
            console.log('UpdateLeaveBalanceByIdComponent: Leave Balance fetched successfully:', this.leaveBalance);
          },
          error: (err) => {
            console.error('UpdateLeaveBalanceByIdComponent: Error fetching leave balance by ID:', err);
            this.isLoading = false; // End loading state even on error
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
        this.isLoading = false; // No data to load
        console.error('UpdateLeaveBalanceByIdComponent: Invalid ID parsed, NaN:', this.leaveBalanceId);
      }
    } else {
      this.errorMessage = 'No Leave Balance ID found in the URL. Cannot update.';
      this.isLoading = false; // No data to load
      console.error('UpdateLeaveBalanceByIdComponent: No ID parameter found in route for update.');
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    console.log('UpdateLeaveBalanceByIdComponent: Submitting form...');

    // Final check for ID validity before sending update request
    // FIX: Use Number.isNaN() here as well
    if (this.leaveBalanceId && !Number.isNaN(this.leaveBalanceId)) {
      console.log('UpdateLeaveBalanceByIdComponent: Attempting to update Leave Balance ID:', this.leaveBalanceId, 'with data:', this.leaveBalance);
      this.leaveBalanceService.updateLeaveBalanceByLeaveId(this.leaveBalanceId, this.leaveBalance).subscribe({
        next: (data) => {
          this.successMessage = 'Leave Balance updated successfully!';
          this.errorMessage = ''; // Clear error on success
          console.log('UpdateLeaveBalanceByIdComponent: Update successful:', data);
          // Navigate back to the list after a short delay for user feedback
          setTimeout(() => {
            this.router.navigate(['/leave-balances']);
          }, 1500); // 1.5 seconds delay
        },
        error: (err) => {
          console.error('UpdateLeaveBalanceByIdComponent: Error updating leave balance by ID', err);
          // Provide more specific error messages based on common HTTP status codes
          if (err.status === 400) {
              this.errorMessage = 'Failed to update: Invalid input data. Please check your fields.';
          } else if (err.status === 404) {
              this.errorMessage = 'Failed to update: Leave balance not found. It might have been deleted.';
          } else if (err.status === 409) { // Example for a conflict
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

  // Optional: Check if form data is different from original
  isFormDirty(): boolean {
    // If original data hasn't loaded yet, consider it not dirty to prevent accidental early submission
    if (!this.originalLeaveBalance) return false;

    // Compare current form values with the original fetched values
    return (
      this.leaveBalance.employeeId !== this.originalLeaveBalance.employeeId ||
      this.leaveBalance.leaveType !== this.originalLeaveBalance.leaveType ||
      this.leaveBalance.balance !== this.originalLeaveBalance.balance
    );
  }
  isInvalidId(): boolean {
    // Use Number.isNaN() as discussed previously for robustness
    return this.leaveBalanceId === null || Number.isNaN(this.leaveBalanceId);
  }
}