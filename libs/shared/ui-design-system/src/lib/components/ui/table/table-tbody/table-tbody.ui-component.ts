import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableUiComponent } from '../table.ui-component';

@Component({
  selector: 'tbody[simplified-table-tbody]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-tbody.ui-component.html',
  styleUrls: ['./table-tbody.ui-component.scss'],
})
export class TableTbodyUiComponent {
  private readonly table = inject(TableUiComponent);
  protected readonly loading = this.table.loading;
}
