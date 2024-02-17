import { isDevMode } from '@angular/core';

export class ShapeMismatchError extends Error {
  constructor(errorList: string[]) {
    super(`Shape mismatch:\n\n${errorList.join('\n')}\n\n`);
  }
}

export function validateShape<T extends object>(
  val: T,
  shape: Partial<T>
): void {
  if (isDevMode()) {
    const errors = validateFormValue(val, shape);
    if (errors.length) {
      throw new ShapeMismatchError(errors);
    }
  }
}

function validateFormValue<T>(
  formValue: T,
  shape: Partial<T>,
  path = ''
): string[] {
  const errors: string[] = [];
  for (const key in formValue) {
    if (Object.prototype.hasOwnProperty.call(formValue, key)) {
      const value = (formValue as Record<string, unknown>)[key];
      const shapeValue = (shape as Record<string, unknown>)[key];
      const newPath = path ? `${path}.${key}` : key;

      if (value !== undefined) {
        if (typeof value === 'object' && value !== null) {
          if (typeof shapeValue !== 'object' || shapeValue === null) {
            errors.push(`[ngModelGroup] Mismatch: '${newPath}'`);
          } else {
            errors.push(
              ...validateFormValue(
                value,
                shapeValue as Record<string, unknown>,
                newPath
              )
            );
          }
        } else if (!(key in shape)) {
          errors.push(`[ngModel] Mismatch '${newPath}'`);
        }
      }
    }
  }
  return errors;
}
