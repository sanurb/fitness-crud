import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerUiComponent } from '../drawer/drawer.ui-component';
import { templateDrivenFormsViewProviders } from '@fitness-crud/shared/util-forms';

@Component({
  selector: 'simplified-base-layout-crud-create',
  standalone: true,
  imports: [CommonModule, DrawerUiComponent],
  templateUrl: './base-layout-crud-create.ui-component.html',
  styleUrls: ['./base-layout-crud-create.ui-component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class BaseLayoutCrudCreateUiComponent {
  @Output() public readonly closeDrawer = new EventEmitter<void>();
  @Input() public icon?: string;
  @Input() public singularLabel = 'item';
}
