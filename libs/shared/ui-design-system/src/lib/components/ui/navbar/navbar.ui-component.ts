import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkThemeToggleUiComponent } from '../dark-theme-toggle/dark-theme-toggle.ui-component';
import { SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputUiComponent } from '../form/input/input.ui-component';
import { DropdownUiComponent } from '../dropdown/dropdown.ui-component';
import { DropdownItemUiComponent } from '../dropdown-item/dropdown-item.ui-component';

@Component({
  selector: 'simplified-navbar',
  standalone: true,
  imports: [
    CommonModule,
    InputUiComponent,
    DarkThemeToggleUiComponent,
    RouterLink,
    FormsModule,
    DropdownUiComponent,
    DropdownItemUiComponent,
  ],
  templateUrl: './navbar.ui-component.html',
  styleUrls: ['./navbar.ui-component.scss'],
})
export class NavbarUiComponent {
  @Input() public avatar: SafeResourceUrl = '';
  @Input() public username: string = '';
  @Input() public search?: string;
  @Output() public searchChange = new EventEmitter<string>();
  @Output() public readonly signout = new EventEmitter<void>();
  @Output() public readonly toggleSidebar = new EventEmitter<void>();
}
