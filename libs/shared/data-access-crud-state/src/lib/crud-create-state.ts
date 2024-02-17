import { SignalState } from 'ngx-signal-state';
import { EntityState } from '@fitness-crud/shared/data-access-crud';
import { ActivatedRoute, Router } from '@angular/router';
import { validateShape } from '@fitness-crud/shared/util-forms';
import { DeepPartial } from '@fitness-crud/shared/type-advanced';

/**
 * This contains boilerplate to avoid redundancy in the create pages
 * All recurring logic of the create page is contained in here
 *
 * This is only valid for pieces of state that are not paged, in our application, that's most of the state
 * We want to load all the data because in our application that makes sense
 */
export class CrudCreateState<
  T extends { id: string },
  K extends object
> extends SignalState<{
  formValue: Partial<K>;
  formValid: boolean;
  acting: boolean;
}> {
  constructor(
    private readonly entityState: EntityState<T>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly shape: K,
    private readonly mapFormToEntity: (form: K) => DeepPartial<T>
  ) {
    super();
    this.initialize({
      formValue: {} as K,
      formValid: false,
      acting: false,
    });

    this.connect({
      ...this.entityState.pick(['acting']),
    });
  }

  public setFormValue(event: K): void {
    this.patch({ formValue: event });
    validateShape(event, this.shape);
  }

  public goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  public save(): void {
    if (this.snapshot.formValid) {
      this.entityState.add(this.mapFormToEntity(this.snapshot.formValue as K));
      this.goBack();
    }
  }
}
