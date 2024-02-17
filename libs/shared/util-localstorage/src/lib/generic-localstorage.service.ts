import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericLocalStorageService {
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  getItemsObservable<T>(key: string): Observable<T> {
    console.log('getItemsObservable', key);
    return new Observable<T>(subscriber => {
      const item = localStorage.getItem(key);
      if (item) {
        subscriber.next(JSON.parse(item) as T);
      }
      subscriber.complete();
    });
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  getAllItems<T>(key: string): T[] {
    return this.getItem<T[]>(key) || [];
  }

  addItem<T>(key: string, newItem: T): void {
    const items = this.getAllItems<T>(key);
    items.push(newItem);
    this.setItem(key, items);
  }

  updateItem<T extends { id: string }>(key: string, updatedItem: T): void {
    let items = this.getAllItems<T>(key);
    items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    this.setItem(key, items);
  }

  removeItemById<T extends { id: string }>(key: string, id: string): void {
    const items = this.getAllItems<T>(key).filter(item => item.id !== id);
    this.setItem(key, items);
  }
}
