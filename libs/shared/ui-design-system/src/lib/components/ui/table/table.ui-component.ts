import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'table[simplified-table]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.ui-component.html',
  styleUrls: ['./table.ui-component.scss'],
})
export class TableUiComponent {
  @HostBinding('class') public readonly class = 'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400';
  @Input() public loading = false;
}
