import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input[simplified-input]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.ui-component.html',
  styleUrls: ['./input.ui-component.scss'],
})
export class InputUiComponent {
  @Input() public type:
    | 'text'
    | 'file'
    | 'number'
    | 'email'
    | 'date'
    | 'checkbox'
    | 'radio' = 'text';

  @HostBinding('class')
  public get classes() {
    if (['text', 'number', 'date', 'email', 'input'].includes(this.type)) {
      return `
      bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
      dark:focus:ring-blue-500 dark:focus:border-blue-500;
`;
    } else if (this.type === 'checkbox') {
      return `
       w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
       dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600;
`;
    }
    return '';
  }
}
