import { Observable } from 'rxjs';
import { DeepPartial } from '@fitness-crud/shared/type-advanced';

export interface CrudHttpClientService<T extends { id: string }> {
  getItems(): Observable<{ data: T[]; errors: string[] }>;

  getItem(itemId: string): Observable<{ data: T[]; errors: string[] }>;

  add(item: DeepPartial<T>): Observable<boolean>;

  update(itemId: string, item: DeepPartial<T>): Observable<boolean>;

  delete(id: string): Observable<boolean>;

  deleteRange(ids: string[]): Observable<boolean>;
}
