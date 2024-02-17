import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from './theme.type';
import { LocalStorageService } from '@fitness-crud/shared/util-localstorage';

@Component({
  selector: 'simplified-dark-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-theme-toggle.ui-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dark-theme-toggle.ui-component.scss'],
})
export class DarkThemeToggleUiComponent {
  private readonly localstorageService = inject(LocalStorageService);
  theme = signal<Theme>('light');

  protected setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  constructor() {
    if (
      this.localstorageService.getItem('color-theme') === 'dark' ||
      (!('color-theme' in this.localstorageService) &&
        'matchMedia' in window &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      this.setTheme('light');
      document.documentElement.classList.remove('dark');
    }
    effect(() => {
      this.localstorageService.setItem('color-theme', this.theme());
      if (this.theme() === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }
}
