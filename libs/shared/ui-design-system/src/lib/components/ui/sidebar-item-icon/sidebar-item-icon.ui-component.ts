import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'i[simplified-sidebar-item-icon]',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar-item-icon.ui-component.html',
  styleUrls: ['./sidebar-item-icon.ui-component.scss'],
})
export class SidebarItemIconUiComponent {
}
