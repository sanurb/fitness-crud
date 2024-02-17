import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'span[simplified-sidebar-item-label]',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

  templateUrl: './sidebar-item-label.ui-component.html',
  styleUrls: ['./sidebar-item-label.ui-component.scss'],
})
export class SidebarItemLabelUiComponent {}
