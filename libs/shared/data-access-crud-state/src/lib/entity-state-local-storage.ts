import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { EntityState } from '@fitness-crud/shared/data-access-crud';
import { DeepPartial } from '@fitness-crud/shared/type-advanced';
import { APP_CONFIG } from '@fitness-crud/shared/util-config';
import { GenericLocalStorageService } from '@fitness-crud/shared/util-localstorage';
import { SignalState } from 'ngx-signal-state';
import {
  BehaviorSubject,
    Subject,
    of,
    throwError
} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export class EntityStateLocalStorage<T extends { id: string }>
  extends SignalState<{
    items: T[];
    loading: boolean;
    loadingItem: boolean;
    acting: boolean;
  }>
  implements EntityState<T>
{
  private readonly appConfig = inject(APP_CONFIG);
  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(GenericLocalStorageService);
  private readonly toast$$ = new Subject<{
    label: string;
    type: 'success' | 'danger';
  }>();
  private readonly apiParameters = this.buildHeadersParameters();

  public readonly toast$ = this.toast$$.asObservable();
  public readonly apiEndpoint = 'exercises';
  private itemsChangeSubject = new BehaviorSubject<void>(undefined);

  constructor() {
    super();
    this.initialize({
      items: [],
      loading: false,
      loadingItem: false,
      acting: false,
    });


    this.connectObservables({
      items: this.itemsChangeSubject.asObservable().pipe(
        switchMap(() => this.localStorageService.getItemsObservable<T[]>(this.apiEndpoint))
      ),
    });
    

    this.loadItemsFromApiOrLocalStorage();
  }

  buildHeadersParameters() {

    const extractHostFromUrl = (url: string) => {
        const urlParts = url.split('/');
        return urlParts[2];
    };
    const apiHost = extractHostFromUrl(this.appConfig.apiHost);

      return {
          headers: {
              'X-RapidAPI-Host': apiHost,
              'X-RapidAPI-Key': this.appConfig.apiKey
          },
      };
  }

  private loadItemsFromApiOrLocalStorage() {
    console.log('loadItemsFromApiOrLocalStorage');
    const localItems = this.localStorageService.getItem<T[]>(this.apiEndpoint);
    if (localItems && localItems.length > 0) {
      this.patch({ items: localItems });
    } else {
      this.loadItemsFromApi();
    }
    this.itemsChangeSubject.next();
  }

  private loadItemsFromApi() {
    this.patch({ loading: true });
    this.http
      .get<T[]>(`${this.appConfig.apiHost}`, this.apiParameters)
      .pipe(
        tap({
          next: (items) => {
            items.forEach((item, index) => {
              item.id = index.toString();
            });
            this.localStorageService.setItem(this.apiEndpoint, items);
            this.patch({ items, loading: false });
          },
          error: () => {
            this.toast$$.next({
              label: 'Failed to load items from API',
              type: 'danger',
            });
            this.patch({ loading: false });
          },
        })
      )
      .subscribe();
  }


  public add(item: DeepPartial<T>): void {
    this.patch({ acting: true });
    this.localStorageService.setItem(this.apiEndpoint, [
      ...this.snapshot.items,
      item,
    ]);
    this.toast$$.next({ label: 'Successfully added!', type: 'success' });
    this.itemsChangeSubject.next();
    this.patch({ acting: false });
    this.itemsChangeSubject.next();
  }

  public update(item: DeepPartial<T>, id?: string): void {
    this.patch({ acting: true });
    this.localStorageService.setItem(
      this.apiEndpoint,
      this.snapshot.items.map((i) => (i.id === id ? item : i))
    );
    this.itemsChangeSubject.next();
    this.toast$$.next({ label: 'Successfully updated!', type: 'success' });
    this.patch({ acting: false });
  }

  /**
   * Deletes an item using the items service and updates the state accordingly.
   * @param id - The ID of the item to delete.
   * @throws Error if there is no active session.
   */
  public delete(id: string): void {
    this.patch({ acting: true });
    this.localStorageService.removeItemById(this.apiEndpoint, id);
    this.itemsChangeSubject.next();
    this.toast$$.next({ label: 'Successfully removed!', type: 'success' });
    this.patch({ acting: false });
  }

  /**
   * Fetches a single item by its ID from the items service and updates the state accordingly.
   * @param id - The ID of the item to fetch.
   * @returns An observable that emits the result of the item retrieval.
   */
  public getItem(id: string) {
    this.patch({ loadingItem: true });
    const item = this.snapshot.items.find((i) => i.id === id);
    if (!item) {
      this.patch({ loadingItem: false });
      return throwError(() => new Error(`Item with id ${id} not found`));
    }
    return of(item).pipe(
      tap(() => {
        this.patch({ loadingItem: false });
      })
    );
  }

  public deleteRange(itemsToDelete: string[]): void {
    console.log('deleteRange', itemsToDelete);
    this.patch({ acting: true });
    const remainingItems = this.snapshot.items.filter(
      (i) => !itemsToDelete.includes(i.id)
    );
    this.localStorageService.setItem(this.apiEndpoint, remainingItems);
    this.itemsChangeSubject.next();
    this.toast$$.next({ label: 'Successfully deleted!', type: 'success' });
    this.patch({ acting: false });
  }
}
