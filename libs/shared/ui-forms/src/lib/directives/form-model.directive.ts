import { Directive, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { FormDirective } from './form.directive';
import { createValidator, getFormControlField } from '@fitness-crud/shared/util-forms';

@Directive({
  selector: '[ngModel]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: FormModelDirective, multi: true },
  ],
})
export class FormModelDirective implements Validator {
  private readonly formDirective = inject(FormDirective);

  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, suite, formValue } = this.formDirective;
    if (!suite || !formValue) {
      return null;
    }
    const field = getFormControlField(ngForm.control, control);
    const validator = createValidator(field, formValue, suite);
    return validator(control);
  }
}
