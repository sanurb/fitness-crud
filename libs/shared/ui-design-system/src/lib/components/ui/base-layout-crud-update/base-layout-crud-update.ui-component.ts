import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerUiComponent } from '../drawer/drawer.ui-component';

@Component({
  selector: 'simplified-base-layout-crud-update',
  standalone: true,
  imports: [CommonModule, DrawerUiComponent],
  templateUrl: './base-layout-crud-update.ui-component.html',
  styleUrls: ['./base-layout-crud-update.ui-component.scss'],
})
export class BaseLayoutCrudUpdateUiComponent {
  @Output() public readonly closeDrawer = new EventEmitter<void>();
  @Input() public icon?: string;
  @Input() public label = 'item';
}
