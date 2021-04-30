import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  CarEntity,
  Owner,
  OwnerEntity,
  OwnerOptionsMode,
  OwnerOptionsModesButtonTitles,
  OwnerOptionsModesTitles,
} from 'src/app/models/car-owner.model';
import { CarOwnersService } from 'src/app/services/car-owners-service';
import { CustomValidator } from 'src/app/services/custom.validator';
import { ErrorMessagesHandlerService } from 'src/app/services/error-messages-handler.service';

@UntilDestroy()
@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss'],
})
export class OwnerFormComponent implements OnInit {
  mode: OwnerOptionsMode;
  title: string | undefined = '';
  buttonTitle: string | undefined = '';
  ownerForm: FormGroup;
  numbers: string[] = [];
  readOnly: boolean = false;
  currentOwnerId: string | null;
  get cars() {
    return this.ownerForm.get('cars') as FormArray;
  }
  get carControls() {
    return this.cars['controls'] as FormGroup[];
  }
  basicNameValidator = [
    Validators.required,
    Validators.pattern('[A-Za-z -]{1,32}'),
    Validators.minLength(2),
  ];
  basicCarValidator = [
    Validators.required,
    Validators.pattern('^[0-9A-Za-z_ .-]+$'),
  ];
  formErrors: { [key: string]: string } = {};

  constructor(
    private carOwnersService: CarOwnersService,
    private errorService: ErrorMessagesHandlerService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.currentOwnerId = this.activatedRouter.snapshot.paramMap.get('id');
    this.mode = this.setMode(this.activatedRouter.snapshot.url[0].path);

    this.ownerForm = this.fb.group({
      lastName: ['', [...this.basicNameValidator]],
      firstName: ['', [...this.basicNameValidator]],
      middleName: ['', [...this.basicNameValidator]],
      cars: this.fb.array([this.initCar()], CustomValidator.carMinAmount(1)),
    });
  }

  ngOnInit(): void {
    this.readOnly = this.mode === OwnerOptionsMode.Details;
    this.title = OwnerOptionsModesTitles.get(this.mode);
    this.buttonTitle = OwnerOptionsModesButtonTitles.get(this.mode);

    if (this.currentOwnerId) {
      this.carOwnersService
        .getOwnerById(+this.currentOwnerId)
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          const { lastName, firstName, middleName, cars } = data as OwnerEntity;

          this.ownerForm.patchValue({ lastName, firstName, middleName });

          this.ownerForm.setControl('cars', this.setExistingCars(cars));
          const keys = Object.keys(this.ownerForm.controls);
          if (this.readOnly) {
            keys.map((key: string) => this.ownerForm.controls[key].disable());
          }

          this.ownerForm.updateValueAndValidity();

          keys.map((key: string) =>
            this.ownerForm.controls[key].markAllAsTouched()
          );
        });
    }

    this.ownerForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (_) =>
          (this.formErrors = this.errorService.logValidationErrorsRecursively(
            this.ownerForm
          ))
      );
  }

  setMode(path: string): OwnerOptionsMode {
    if (path === 'update') return OwnerOptionsMode.Update;
    if (path === 'details') return OwnerOptionsMode.Details;
    return OwnerOptionsMode.Create;
  }

  setExistingCars(cars: CarEntity[]): FormArray {
    const formArray = new FormArray([], CustomValidator.carMinAmount(1));

    cars.forEach((car) => {
      formArray.push(this.initCar(car));
    });

    return formArray;
  }

  initCar(car?: CarEntity): FormGroup {
    return this.fb.group({
      registrationNumber: [
        car?.registrationNumber || '',
        [Validators.required, CustomValidator.registrationNumberValidator],
        [
          CustomValidator.carExistValidator(
            this.carOwnersService,
            this.currentOwnerId
          ),
        ],
      ],
      producer: [car?.producer || '', [...this.basicCarValidator]],
      model: [car?.model || '', [...this.basicCarValidator]],
      year: [
        car?.year || '',
        [Validators.required, Validators.pattern("^[0-9]*$"), CustomValidator.yearValidator(1990)],
      ],
    });
  }

  addCar(): void {
    this.cars.push(this.initCar());
  }

  removeCar(index: number): void {
    this.cars.removeAt(index);
  }

  onSubmit(): void {
    const { lastName, firstName, middleName, cars } = this.ownerForm
      .value as Owner;
    switch (this.mode) {
      case OwnerOptionsMode.Update:
        this.carOwnersService
          .editOwner({
            ...this.ownerForm.value,
            id: Number(this.currentOwnerId),
          })
          .pipe(untilDestroyed(this))
          .subscribe();
        break;
      default:
        this.carOwnersService
          .createOwner(lastName, firstName, middleName, cars)
          .pipe(untilDestroyed(this))
          .subscribe();
        break;
    }

    this.router.navigateByUrl('/owners');
  }
}
