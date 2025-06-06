// src/app/leave-balance-by-employee/leave-balance-by-employee.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LeaveBalanceDTO } from '../../models/leave-balance.dto';
import { LeaveBalanceService } from '../../services/leave-balance.service';


@Component({
  selector: 'app-leave-balance-by-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './leave-balance-by-employee-id.component.html',
  styleUrls: ['./leave-balance-by-employee-id.component.css'],
  providers: [LeaveBalanceService]
})
export class LeaveBalanceByEmployeeIdComponent implements OnInit {
  employeeIdInput: string = '';

  leaveBalances: LeaveBalanceDTO[] = [];

  errorMessage: string | null = null;

  loading: boolean = false;

  constructor(
    private leaveBalanceService: LeaveBalanceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idFromUrl = params.get('employeeId');
      if (idFromUrl) {
        this.employeeIdInput = idFromUrl;
        this.fetchLeaveBalances();
      }
    });
  }

  fetchLeaveBalances(): void {
    const idAsNumber = parseInt(this.employeeIdInput, 10);

    if (isNaN(idAsNumber) || idAsNumber <= 0) {
      this.errorMessage = 'Please enter a valid positive Employee ID.';
      this.leaveBalances = [];
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.leaveBalances = [];

    this.leaveBalanceService.getLeaveBalancesByEmployeeId(idAsNumber)
      .subscribe({
        next: (data: LeaveBalanceDTO | LeaveBalanceDTO[]) => {
          this.leaveBalances = Array.isArray(data) ? data : [data];

          this.loading = false;
          if (this.leaveBalances.length === 0) {
            this.errorMessage = `No leave balances found for Employee ID: ${idAsNumber}.`;
          }
        },
        error: (err) => {
          console.error('Error fetching leave balances by Employee ID:', err);
          this.errorMessage = err.error?.message || err.message || 'Failed to retrieve leave balances. Please try again.';
          this.loading = false;
        }
      });
  }

  deleteLeaveBalance(id: number): void {
      if (confirm('Are you sure you want to delete this leave balance?')) {
          this.leaveBalanceService.deleteLeaveBalance(id).subscribe({
              next: () => {
                  this.leaveBalances = this.leaveBalances.filter(lb => lb.leaveBalanceId !== id);
                  this.errorMessage = null;
                  console.log(`Leave balance with ID ${id} deleted successfully.`);
              },
              error: (err) => {
                  console.error('Error deleting leave balance:', err);
                  this.errorMessage = err.error?.message || err.message || 'Failed to delete leave balance.';
              }
          });
      }
  }
}