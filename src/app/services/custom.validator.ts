import { CarOwnersService } from './car-owners-service';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CustomValidator {
  static registrationNumberValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control?.value.match('^[A-Z]{2}[0-9]{4}[A-Z]{2}$')) {
      return { invalidRegistrationNumber: true };
    }
    return null;
  }

  static yearValidator(minYear: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      const currentYear = new Date().getFullYear();
      const year = parseInt(control.value, 10);
      if (year < minYear || year > currentYear) {
        return { invalidYear: true };
      }
      return null;
    };
  }

  static carMinAmount(minCars: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      const carsAmount = control.value.length;
      if (carsAmount < minCars) {
        return { invalidCarAmount: true };
      }
      return null;
    };
  }

  static carExistValidator(
    carOwnersService: CarOwnersService,
    id: string | null
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const existingNumbers$ = carOwnersService
        .checkExistRegistrationNumber(control.value, id)
        .pipe(
          map((result: boolean) => (!result ? null : { invalidCarExist: true }))
        );
      return existingNumbers$;
    };
  }
}
