import { SignalState } from 'ngx-signal-state';
import { EntityState } from '@fitness-crud/shared/data-access-crud';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { validateShape } from '@fitness-crud/shared/util-forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { DeepPartial } from '@fitness-crud/shared/type-advanced';

/**
 * This contains boilerplate to avoid redundancy in the update pages
 * All recurring logic of the update page is contained in here
 *
 * This is only valid for pieces of state that are not paged, in our application, that's most of the state
 * We want to load all the data because in our application that makes sense
 */
export class CrudUpdateState<
  T extends { id: string },
  K extends object
> extends SignalState<{
  formValue: Partial<K>;
  formDirty: boolean;
  formValid: boolean;
  loading: boolean;
  loadingItem: boolean;
  id: string;
  acting: boolean;
  deleteOpen: boolean;
  item: T | null;
}> {
  constructor(
    private readonly entityState: EntityState<T>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly shape: K,
    private readonly mergeEntityWithForm: (
      entity: T,
      formValue: Partial<K>
    ) => K,
    private readonly mapFormToEntity: (form: K) => DeepPartial<T>
  ) {
    super();
    this.initialize({
      formDirty: false,
      formValid: false,
      formValue: {} as K,
      loading: false,
      loadingItem: false,
      acting: false,
      id: '',
      deleteOpen: false,
      item: null,
    });

    this.connect({
      formValue: this.select('item', (item) => {
        return item
          ? this.mergeEntityWithForm(item, this.snapshot.formValue)
          : ({} as K);
      }),
    });

    this.connect({
      ...this.entityState.pick(['loading', 'acting']),
      loadingItem: this.entityState.select('loadingItem'),
    });
    this.connectObservables({
      item: toObservable(this.select('id')).pipe(
        filter((id) => !!id),
        switchMap((id) => this.entityState.getItem(id)),
        map((resp) => resp)
      ),
      id: this.activatedRoute.params.pipe(map((params) => params['id'])),
    });
  }

  public closeDrawer(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  public setFormValue(event: K): void {
    validateShape(event, this.shape);
    this.patch({ formValue: event });
  }

  public closeDialog(): void {
    this.patch({
      deleteOpen: false,
    });
  }

  public performRemove(): void {
    this.entityState.delete(this.activatedRoute.snapshot.params['id']);
    this.goBack();
  }

  public save(): void {
    if (this.snapshot.formValid) {
      this.entityState.update(
        this.mapFormToEntity(this.snapshot.formValue as K),
        this.snapshot.id
      );
      this.goBack();
    }
  }

  public delete(): void {
    this.patch({
      deleteOpen: true,
    });
  }

  public goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
