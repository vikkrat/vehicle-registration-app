import { FormArray, FormGroup } from '@angular/forms';

export class ErrorMessagesHandlerService {
  logValidationErrorsRecursively(group: FormGroup): { [key: string]: string } {
    const messagesArr: { [key: string]: string } = {};

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormArray) {
        abstractControl.controls.forEach((el: any) => {
          this.logValidationErrorsRecursively(el);
        });
      } else if (abstractControl instanceof FormGroup) {
        this.logValidationErrorsRecursively(abstractControl);
      } else {
        messagesArr[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.errorMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              messagesArr[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });

    return messagesArr;
  }

  errorMessages: { [key: string]: { [key: string]: string } } = {
    lastName: {
      required: 'Last name is required.',
      pattern: 'Please, use only characters in upper- & lower case.',
      minlength: 'Last name need to be 2 characters at least.',
    },
    firstName: {
      required: 'First name is required.',
      pattern: 'Please, use only characters in upper- & lower case.',
      minlength: 'First name need to be 2 characters at least.',
    },
    middleName: {
      required: 'Middle name is required.',
      pattern: 'Please, use only characters in upper- & lower case.',
      minlength: 'Middle name need to be 2 characters at least.',
    },
    cars: {
      carMinAmount: 'Every person must own at least one car.',
    },
    registrationNumber: {
      required: 'Registration number is required.',
      invalidRegistrationNumber:
        'Please, use format: 2 latin characters in upper case, 4 numbers and 2 latin characters in upper case.',
      invalidCarExist: 'Car with this registration number already has owner.',
    },
    model: {
      required: 'Model is required.',
      pattern: 'Please, use numbers or characters in upper- & lower case.',
    },
    producer: {
      required: 'Producer is required.',
      pattern: 'Please, use numbers or characters in upper- & lower case.',
    },
    year: {
      required: 'Year is required.',
      pattern: 'Year need to be a number.',
      invalidYear: 'Please, use numbers in the range 1990 - the current year.',
    },
  };
}
