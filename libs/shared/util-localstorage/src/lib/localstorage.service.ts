import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public getItem(key: string): string | null {
    const item = this.document.defaultView?.localStorage.getItem(key);
    return item || null;
  }

  public setItem(key: string, value: string): void {
    this.document.defaultView?.localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    this.document.defaultView?.localStorage.removeItem(key);
  }

  public clear(): void {
    this.document.defaultView?.localStorage.clear();
  }
}
