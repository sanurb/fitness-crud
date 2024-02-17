import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[simplified-label]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.ui-component.html',
  styleUrls: ['./label.ui-component.scss'],
})
export class LabelUiComponent {
  @Input() public labelType: 'default' | 'checkbox-right' = 'default';

  @HostBinding('class') get tailwind() {
    let extraClasses = '';
    if (this.labelType === 'default') {
      extraClasses += 'pb-2';
    } else if (this.labelType === 'checkbox-right') {
      extraClasses += 'ml-2';
    }
    return `${extraClasses} flex text-sm font-medium text-gray-900 dark:text-gray-300`;
  }
}
