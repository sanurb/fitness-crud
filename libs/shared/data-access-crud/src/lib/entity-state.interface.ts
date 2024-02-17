import { SignalState } from 'ngx-signal-state';
import { Observable } from 'rxjs';
import { DeepPartial } from '@fitness-crud/shared/type-advanced';

export interface EntityState<T extends { id: string }> extends SignalState<{
  items: T [],
  loading: boolean;
  loadingItem: boolean;
  acting: boolean;
}> {

  add(item: DeepPartial<T>): void;

  update(item: DeepPartial<T>, id?: string): void;

  delete(id: string): void;

  getItem(id: string): Observable<T>;

  deleteRange(itemsToDelete: string[]): void;
}
