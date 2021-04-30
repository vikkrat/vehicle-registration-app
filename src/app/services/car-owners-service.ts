import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ICarOwnersService } from './../models/car-owners-service.model';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { OwnerEntity, CarEntity } from '../models/car-owner.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CarOwnersService implements ICarOwnersService {
  private baseURL = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOwners(): Observable<OwnerEntity[]> {
    return this.http
      .get<OwnerEntity[]>(`${this.baseURL}/owners`)
      .pipe(catchError(this.errorHandler));
  }

  getOwnerById(id: number): Observable<OwnerEntity> {
    return this.http
      .get<OwnerEntity>(`${this.baseURL}/owners/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  createOwner(
    firstName: string,
    lastName: string,
    middleName: string,
    cars: CarEntity[]
  ): Observable<OwnerEntity> {
    const id: number = new Date().getTime();
    return this.http
      .post<OwnerEntity>(
        `${this.baseURL}/owners`,
        { id, firstName, lastName, middleName, cars },
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  editOwner(owner: OwnerEntity): Observable<OwnerEntity> {
    return this.http
      .put<OwnerEntity>(
        `${this.baseURL}/owners/${owner.id}`,
        owner,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteOwner(id: number): Observable<OwnerEntity[]> {
    return this.http
      .delete<OwnerEntity[]>(`${this.baseURL}/owners/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  checkExistRegistrationNumber(
    value: string,
    id?: string | null
  ): Observable<boolean> {
    return this.getOwners().pipe(
      switchMap((owners) => {
        const registrationNumbers: string[] = [];
        owners.forEach((owner: OwnerEntity) =>
          owner.cars.map((car) => {
            const condition = id
              ? owner.id !== +id ||
                (owner.id === +id && car.registrationNumber !== value)
              : car.registrationNumber !== value;
            if (condition) {
              registrationNumbers.push(car.registrationNumber);
            }
          })
        );

        return of(registrationNumbers.includes(value));
      })
    );
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
