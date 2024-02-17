import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonUiComponent } from '../button/button.ui-component';
import { RouterLink } from '@angular/router';
import { InputUiComponent } from '../form/input/input.ui-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownUiComponent } from '../dropdown/dropdown.ui-component';
import { DropdownItemUiComponent } from '../dropdown-item/dropdown-item.ui-component';

@Component({
  selector: 'simplified-base-layout-crud-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DropdownItemUiComponent, DropdownUiComponent, ButtonUiComponent, InputUiComponent, ReactiveFormsModule],
  templateUrl: './base-layout-crud-list.component.html',
  styleUrls: ['./base-layout-crud-list.component.scss'],
})
export class BaseLayoutCrudListComponent {
  @Input() public singularLabel = 'item';
  @Input() public pluralLabel = 'items';
  @Input() public icon?: string;
  @Input() public numberOfSelectedItems = 0;
  @Input() public search?: string;
  @Output() public searchChange = new EventEmitter<string>();
  @Output() public deleteSelected = new EventEmitter();
}
