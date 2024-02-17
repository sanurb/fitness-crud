import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button[simplified-button]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.ui-component.html',
  styleUrls: ['./button.ui-component.scss'],
})
export class ButtonUiComponent {
  @Input() public buttonType:
    | 'none'
    | 'default'
    | 'alternative'
    | 'dark'
    | 'light'
    | 'green'
    | 'red'
    | 'yellow'
    | 'purple' = 'default';

  @Input() public icon?: string;
  @Input() public mobileBlock = false;
  @Input() public disabled = false;
  @Input() public hideLabelOnMobile = true;

  @HostBinding('class') get class() {
    let extraClasses = 'inline-flex items-center';
    if (this.mobileBlock) {
      extraClasses += ' w-full md:w-auto lg:w-auto';
    }
    if (this.disabled) {
      extraClasses += ' cursor-not-allowed ';
    }
    switch (this.buttonType) {
      case 'default':
        return `${extraClasses} focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`;
      case 'alternative':
        return `${extraClasses} py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`;
      case 'dark':
        return `${extraClasses} text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`;
      case 'light':
        return `${extraClasses} text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`;
      case 'green':
        return `${extraClasses} focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`;
      case 'red':
        return `${extraClasses} focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`;
      case 'yellow':
        return `${extraClasses} focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900`;
      case 'purple':
        return `${extraClasses} focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`;
      case 'none':
        return `${extraClasses} text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700`;
      default:
        return '';
    }
  }
}
