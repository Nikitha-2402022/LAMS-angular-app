// NO @NgModule HERE FOR STANDALONE APPS
import { Routes } from '@angular/router';
import { LeaveBalanceListComponent } from './components/leave-balance-list/leave-balance-list.component';
import { CreateLeaveBalanceComponent } from './components/create-leave-balance/create-leave-balance.component';
import { LeaveBalanceByEmployeeIdComponent } from './components/leave-balance-by-employee-id/leave-balance-by-employee-id.component';
import { UpdateLeaveBalanceByIdComponent } from './components/update-leave-balance-by-leave-id/update-leave-balance-by-leave-id.component';
import { UpdateLeaveBalanceByEmployeeIdComponent } from './components/update-leave-balance-by-employee-id/update-leave-balance-by-employee-id.component';

export const routes: Routes = [ // <--- Export the routes array directly
  { path: 'leave-balances', component: LeaveBalanceListComponent },
  { path: 'add-leave-balance', component: CreateLeaveBalanceComponent },
  // { path: 'leave-balances/employee/:employeeId', component: LeaveBalanceByEmployeeIdComponent },
  {path: 'search-leave-by-employee', component: LeaveBalanceByEmployeeIdComponent},
  { path: 'update-by-leave-id/:id', component: UpdateLeaveBalanceByIdComponent },
  { path: 'update-by-employee-id', component: UpdateLeaveBalanceByEmployeeIdComponent },
  { path: '', redirectTo: '/leave-balances', pathMatch: 'full' },
  { path: '**', redirectTo: '/leave-balances' }
];