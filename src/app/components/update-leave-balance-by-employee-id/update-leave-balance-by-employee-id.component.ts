import { Component, OnInit } from '@angular/core';
import { LeaveBalanceDTO } from '../../models/leave-balance.dto';
import { LeaveBalanceService } from '../../services/leave-balance.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'lams-update-leave-balance-by-employee-id',
  templateUrl: './update-leave-balance-by-employee-id.component.html',
  styleUrls: ['./update-leave-balance-by-employee-id.component.css'],
  imports:[FormsModule,NgFor,NgIf, RouterLink]
})
export class UpdateLeaveBalanceByEmployeeIdComponent implements OnInit {
  employeeIdToSearch: number | null = null;
  employeeLeaveBalances: LeaveBalanceDTO[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showBalancesTable: boolean = false;

  constructor(
    private leaveBalanceService: LeaveBalanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('employeeId');
      if (idParam) {
        this.employeeIdToSearch = +idParam;
        this.searchLeaveBalances();
      }
    });
  }

  searchLeaveBalances(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.employeeLeaveBalances = [];
    this.showBalancesTable = false;

    if (!this.employeeIdToSearch || this.employeeIdToSearch <= 0) {
      this.errorMessage = 'Please enter a valid Employee ID to search.';
      return;
    }

    this.leaveBalanceService.getLeaveBalancesByEmployeeId(this.employeeIdToSearch).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.employeeLeaveBalances = data;
          this.showBalancesTable = true;
          this.successMessage = `Found ${data.length} leave balances for Employee ID ${this.employeeIdToSearch}.`;
        } else {
          this.errorMessage = `No leave balances found for Employee ID ${this.employeeIdToSearch}.`;
        }
      },
      error: (err) => {
        console.error('Error fetching leave balances:', err);
        this.errorMessage =
          err.status === 404
            ? `Employee ID ${this.employeeIdToSearch} not found or has no leave balances.`
            : 'Failed to load leave balances. Please try again later.';
      }
    });
  }

  saveAllChanges(): void {
    let successfulUpdates = 0;
    let failedUpdates = 0;
    const totalBalances = this.employeeLeaveBalances.length;

    const updateRequests = this.employeeLeaveBalances.map(lb => {
      if (lb.employeeId) {
        return this.leaveBalanceService.updateLeaveBalancesByEmployeeId(lb.employeeId, lb).toPromise()
          .then(() => successfulUpdates++)
          .catch(() => failedUpdates++);
      }
      return Promise.resolve();
    });

    Promise.all(updateRequests).then(() => {
      this.handleBatchUpdateCompletion(successfulUpdates, failedUpdates, totalBalances);
    });
  }

  private handleBatchUpdateCompletion(successful: number, failed: number, total: number): void {
    this.successMessage =
      failed === 0
        ? `All ${successful} leave balances updated successfully for Employee ID ${this.employeeIdToSearch}!`
        : `Updated ${successful} out of ${total} leave balances. ${failed} updates failed. Please check console for details.`;

    setTimeout(() => {
      if (failed === 0) {
        this.router.navigate(['/leave-balances']);
      }
    }, 2000);
  }

  cancelEdit(): void {
    this.router.navigate(['/leave-balances']);
  }
}
