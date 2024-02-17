import { SignalState } from 'ngx-signal-state';
import {
  catchError,
  filter,
  map,
  NEVER,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from './entity-state.interface';
import { CrudHttpClientService } from './crud-http-client.service';
import { DeepPartial } from '@fitness-crud/shared/type-advanced';

export class EntityStateHttpClient<T extends { id: string }>
  extends SignalState<{
    items: T[];
    loading: boolean;
    loadingItem: boolean;
    acting: boolean;
  }>
  implements EntityState<T>
{
  private readonly toast$$ = new Subject<{
    label: string;
    type: 'success' | 'danger';
  }>();
  public readonly toast$ = this.toast$$.asObservable();

  constructor(private readonly itemsService: CrudHttpClientService<T>) {
    super();
    this.initialize({
      items: [],
      loading: false,
      loadingItem: false,
      acting: false,
    });

    this.connectObservables({
      items: of(null).pipe(
        tap(() => this.patch({ loading: true })),
        switchMap(() =>
          this.itemsService.getItems().pipe(
            catchError((err: HttpErrorResponse) => {
              this.toast$$.next({
                label: this.mapError({
                  message: err.message,
                  httpStatusCode: err.status,
                }),
                type: 'danger',
              });
              return NEVER;
            })
          )
        ),
        tap((res) => {
          if (res.errors.length > 0) {
            this.toast$$.next({
              label: this.mapError({
                message: res.errors[0],
                httpStatusCode: 0,
              }),
              type: 'danger',
            });
          }
        }),
        filter((res) => res.errors.length === 0),
        map((res) => res.data || []),
        tap(() => {
          this.patch({ loading: false });
        })
      ),
    });
  }

  public getItem(id: string) {
    this.patch({ loadingItem: true });
    return this.itemsService.getItem(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toast$$.next({
          label: this.mapError({
            message: err.message,
            httpStatusCode: err.status,
          }),
          type: 'danger',
        });
        return NEVER;
      }),
      tap((res) => {
        if (res.errors.length > 0) {
          this.toast$$.next({
            label: this.mapError({ message: res.errors[0], httpStatusCode: 0 }),
            type: 'danger',
          });
        }
      }),
      filter((res) => res.errors.length === 0),
      map((res) => (res.data as T[])[0]),
      tap(() => {
        this.patch({ loadingItem: false });
      })
    );
  }

  public add(item: DeepPartial<T>): void {
    this.patch({ acting: true });
    this.itemsService
      .add(item)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toast$$.next({
            label: this.mapError({
              message: err.message,
              httpStatusCode: err.status,
            }),
            type: 'danger',
          });
          return NEVER;
        })
      )
      .subscribe(() => {
        this.toast$$.next({ label: 'Successfully added!', type: 'success' });
        this.patch({ acting: false });
      });
  }

  public update(item: DeepPartial<T>, id: string): void {
    this.patch({ acting: true });
    this.itemsService
      .update(id, item)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toast$$.next({
            label: this.mapError({
              message: err.message,
              httpStatusCode: err.status,
            }),
            type: 'danger',
          });
          return NEVER;
        })
      )
      .subscribe(() => {
        this.toast$$.next({ label: 'Successfully updated!', type: 'success' });
        this.patch({ acting: false });
        this.trigger('items');
      });
  }

  public delete(id: string): void {
    this.patch({ acting: true });
    this.itemsService
      .delete(id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toast$$.next({
            label: this.mapError({
              message: err.message,
              httpStatusCode: err.status,
            }),
            type: 'danger',
          });
          return NEVER;
        })
      )
      .subscribe(() => {
        this.toast$$.next({ label: 'Successfully deleted!', type: 'success' });
        this.patch({ acting: false });
        this.trigger('items');
      });
  }

  public deleteRange(itemsToDelete: string[]): void {
    this.patch({ acting: true });
    this.itemsService
      .deleteRange(itemsToDelete)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toast$$.next({
            label: this.mapError({
              message: err.message,
              httpStatusCode: err.status,
            }),
            type: 'danger',
          });
          return NEVER;
        })
      )
      .subscribe(() => {
        this.toast$$.next({ label: 'Successfully deleted!', type: 'success' });
        this.patch({ acting: false });
        this.trigger('items');
      });
  }

  private mapError(error: { httpStatusCode: number; message: string }): string {
    switch (error.httpStatusCode) {
      case 404:
        return 'Not found, are you connected to the internet?';
      case 400:
        return 'This action is not allowed';
      case 409:
        return error.message;
    }
    return 'Something went wrong';
  }
}
