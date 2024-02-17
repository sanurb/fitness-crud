import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'td[simplified-table-td]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-td.ui-component.html',
  styleUrls: ['./table-td.ui-component.scss'],
})
export class TableTdUiComponent {
  @HostBinding('class') public readonly class = 'px-4 py-3';

}
