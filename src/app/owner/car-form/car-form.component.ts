import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ErrorMessagesHandlerService } from 'src/app/services/error-messages-handler.service';

@UntilDestroy()
@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
  @Input('group') carGroup!: FormGroup;
  @Input() carsAmount!: number;
  @Output() onRemove = new EventEmitter();

  errorMessages: { [key: string]: string } = {};

  constructor(private errorService: ErrorMessagesHandlerService) {}

  ngOnInit(): void {
    this.carGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (_) =>
          (this.errorMessages = this.errorService.logValidationErrorsRecursively(
            this.carGroup
          ))
      );
  }

  deleteCar(event: Event) {
    this.onRemove.emit(event);
  }
}
