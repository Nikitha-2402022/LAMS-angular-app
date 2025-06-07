import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // <-- This import is crucial
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';

import { LeaveBalanceListComponent } from './app/components/leave-balance-list/leave-balance-list.component';
import { CreateLeaveBalanceComponent } from './app/components/create-leave-balance/create-leave-balance.component';
import { LeaveBalanceByEmployeeIdComponent } from './app/components/leave-balance-by-employee-id/leave-balance-by-employee-id.component';
import { UpdateLeaveBalanceByLeaveIdComponent } from './app/components/update-leave-balance-by-leave-id/update-leave-balance-by-leave-id.component';
import { UpdateLeaveBalanceByEmployeeIdComponent } from './app/components/update-leave-balance-by-employee-id/update-leave-balance-by-employee-id.component';

export const routes: Routes = [
  { path: 'leave-balances', component: LeaveBalanceListComponent },
  { path: 'add-leave-balance', component: CreateLeaveBalanceComponent },
  {path: 'search-leave-by-employee', component: LeaveBalanceByEmployeeIdComponent},
  { path: 'update-by-leave-id/:id', component: UpdateLeaveBalanceByLeaveIdComponent },
  { path: 'update-by-employee-id', component: UpdateLeaveBalanceByEmployeeIdComponent },
  { path: '', redirectTo: '/leave-balances', pathMatch: 'full' },
  { path: '**', redirectTo: '/leave-balances' } // Wildcard route
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
})
.catch(err => console.error(err));