import { Component } from '@angular/core';
import { LeaveBalanceDTO } from '../../models/leave-balance.dto';
import { LeaveBalanceService } from '../../services/leave-balance.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'lams-update-leave-balance-by-employee-id',
  templateUrl: './update-leave-balance-by-employee-id.component.html',
  styleUrls: ['./update-leave-balance-by-employee-id.component.css'],
  imports:[NgIf, FormsModule, RouterModule]

})
export class UpdateLeaveBalanceByEmployeeIdComponent {
  employeeId: number | null = null;
  leaveBalance: LeaveBalanceDTO = {
    employeeId: 0, // This will be set by the employeeId input
    leaveType: '',
    balance: 0
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private leaveBalanceService: LeaveBalanceService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.employeeId === null || this.employeeId === 0) {
      this.errorMessage = 'Please enter a valid Employee ID.';
      return;
    }

    // Ensure the employeeId in the DTO matches the input employeeId
    this.leaveBalance.employeeId = this.employeeId;

    this.leaveBalanceService.updateLeaveBalancesByEmployeeId(this.employeeId, this.leaveBalance).subscribe({
      next: (data) => {
        this.successMessage = 'Leave Balances for Employee ID ' + this.employeeId + ' updated successfully!';
        this.employeeId = null; // Clear employee ID
        this.leaveBalance = { employeeId: 0, leaveType: '', balance: 0 }; // Reset form
        this.router.navigate(['/leave-balances']); // Navigate back to list
      },
      error: (err) => {
        console.error('Error updating leave balances by Employee ID', err);
        // Check for specific error message from your backend for employee not found
        if (err.status === 404 && err.error && err.error.message && err.error.message.includes('Employee ID')) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Failed to update leave balances for Employee ID ' + this.employeeId + '. Please check your input.';
        }
      }
    });
  }
}