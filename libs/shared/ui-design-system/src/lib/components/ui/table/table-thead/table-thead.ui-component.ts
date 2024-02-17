import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'thead[simplified-table-head]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-thead.ui-component.html',
  styleUrls: ['./table-thead.ui-component.scss'],
})
export class TableTheadUiComponent {
  @HostBinding('class') public readonly class = 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400';

}
