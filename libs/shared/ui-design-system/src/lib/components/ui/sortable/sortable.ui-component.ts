import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'simplified-sortable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sortable.ui-component.html',
  styleUrls: ['./sortable.ui-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortableUiComponent {
  @Input() public sortDirection: 'asc' | 'desc' = 'asc';
}
