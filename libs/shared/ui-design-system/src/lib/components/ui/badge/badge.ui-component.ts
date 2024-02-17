import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'simplified-badge',
  standalone: true,
  templateUrl: './badge.ui-component.html',
  styleUrls: ['./badge.ui-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeUiComponent {
  @Input() public badgeType:
    | 'default'
    | 'dark'
    | 'red'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'pink'
    | 'indigo' = 'default';

  @HostBinding('class') get classes() {
    switch (this.badgeType) {
      case 'red':
        return `bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`;
      case 'green':
        return `bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300`;
      case 'yellow':
        return `bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300`;
      case 'purple':
        return `bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300`;
      case 'pink':
        return `bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300`;
      case 'indigo':
        return `bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300`;
      case 'default':
        return `bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`;
      case 'dark':
        return `bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`;
    }
  }
}
