import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'a[simplified-dropdown-item]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-item.ui-component.html',
  styleUrls: ['./dropdown-item.ui-component.scss'],
})
export class DropdownItemUiComponent {
  @HostBinding('class') classes =
    'block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white';
}
