// src/app/services/leave-balance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LeaveBalanceDTO } from '../models/leave-balance.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {
  private apiUrl = environment.apiUrl + '/leaveBalances';

  constructor(private http: HttpClient) { }

  getAllLeaveBalances(): Observable<LeaveBalanceDTO[]> {
    return this.http.get<LeaveBalanceDTO[]>(`${this.apiUrl}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createLeaveBalance(leaveBalance: LeaveBalanceDTO): Observable<LeaveBalanceDTO> {
    return this.http.post<LeaveBalanceDTO>(`${this.apiUrl}/add`, leaveBalance)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLeaveBalancesByEmployeeId(employeeId: number): Observable<LeaveBalanceDTO[]> {
    return this.http.get<LeaveBalanceDTO[]>(`${this.apiUrl}/employee/${employeeId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLeaveBalanceByLeaveBalanceId(id: number): Observable<LeaveBalanceDTO> {
    return this.http.get<LeaveBalanceDTO>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLeaveBalanceByLeaveId(id: number, leaveBalance: LeaveBalanceDTO): Observable<LeaveBalanceDTO> {
    return this.http.put<LeaveBalanceDTO>(`${this.apiUrl}/leave/${id}`, leaveBalance)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLeaveBalancesByEmployeeId(employeeId: number, leaveBalance: LeaveBalanceDTO): Observable<LeaveBalanceDTO[]> {
    return this.http.put<LeaveBalanceDTO[]>(`${this.apiUrl}/employee/${employeeId}`, leaveBalance)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLeaveBalance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);

      if (error.error && typeof error.error === 'object' && error.error.message) {
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.statusText) {
        errorMessage = `Error ${error.status}: ${error.statusText}`;
      } else {
        errorMessage = `Error ${error.status}: Something went wrong on the server.`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}