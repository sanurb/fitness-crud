import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'th[simplified-table-th]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-th.ui-component.html',
  styleUrls: ['./table-th.ui-component.scss'],
})
export class TableThUiComponent {
  @HostBinding('class') public readonly class = 'px-4 py-3';
}
