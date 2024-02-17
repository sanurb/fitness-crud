import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignalState } from 'ngx-signal-state';
import { interval, map, mergeMap, Observable, take, tap } from 'rxjs';

/**
 * This decouples the ui part completely from the state and data-access part.
 * After all data-access libs don't have anything to do with ui logic
 */
@Injectable()
export class ToastService extends SignalState<{
  toasts: {
    label: string;
    id: number;
    type: 'danger' | 'warning' | 'success';
  }[];
  id: number;
}> {
  private readonly timeToShow = 10000;

  constructor() {
    super();
    this.initialize({
      id: 0,
      toasts: [],
    });
  }

  public registerEntityStates(
    states: {
      toast$: Observable<{ label: string; type: 'success' | 'danger' }>;
    }[]
  ): void {
    states.forEach((state) => {
      state.toast$
        .pipe(
          map((toast) => ({ toast, id: this.snapshot.id + 1 })),
          tap(({ toast, id }) => {
            this.patch({
              id,
              toasts: [
                ...this.snapshot.toasts,
                { label: toast.label, id, type: toast.type },
              ],
            });
          }),
          mergeMap((res) =>
            interval(this.timeToShow).pipe(
              take(1),
              tap(() => {
                this.patch({
                  toasts: this.snapshot.toasts.filter((v) => v.id !== res.id),
                });
              })
            )
          ),
          takeUntilDestroyed()
        )
        .subscribe(() => {});
    });
  }

  public closeToast(id: number): void {
    this.patch({
      toasts: this.snapshot.toasts.filter((v) => v.id !== id),
    });
  }
}
