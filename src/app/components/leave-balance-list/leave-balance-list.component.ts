import { Component, OnInit } from '@angular/core';
import { LeaveBalanceService } from '../../services/leave-balance.service';
import { LeaveBalanceDTO } from '../../models/leave-balance.dto';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lams-leave-balance-list', 
  imports: [
    NgIf,
    NgFor,  
    RouterModule   
  ],
  templateUrl: './leave-balance-list.component.html',
  styleUrls: ['./leave-balance-list.component.css'],
})
export class LeaveBalanceListComponent implements OnInit {
  leaveBalances: LeaveBalanceDTO[] = [];
  errorMessage: string = '';

  constructor(private leaveBalanceService: LeaveBalanceService) { }

  ngOnInit(): void {
    this.getAllLeaveBalances();
  }

  getAllLeaveBalances(): void {
    this.leaveBalanceService.getAllLeaveBalances().subscribe({
      next: (data) => {
        this.leaveBalances = data;
        this.errorMessage = '';
        console.log('All Leave Balances (Attendance List):', this.leaveBalances);
      },
      error: (err) => {
        console.error('Error fetching leave balances', err);
        this.errorMessage = 'Failed to load leave balances. Please try again later.';
      }
    });
  }

  deleteLeaveBalance(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete: Leave Balance ID is undefined.');
      return;
    }
    if (confirm('Are you sure you want to delete this leave balance?')) {
      this.leaveBalanceService.deleteLeaveBalance(id).subscribe({
        next: () => {
          console.log('Leave balance deleted successfully');
          this.getAllLeaveBalances(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting leave balance', err);
          this.errorMessage = 'Failed to delete leave balance.';
        }
      });
    }
  }
}