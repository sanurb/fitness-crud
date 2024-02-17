import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tr[simplified-table-tr]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-tr.ui-component.html',
  styleUrls: ['./table-tr.ui-component.scss'],
})
export class TableTrUiComponent {
  @HostBinding('class') public readonly class =
    'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700';
}
