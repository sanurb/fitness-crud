import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'a[simplified-sidebar-item][routerLink]',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-item.ui-component.html',
  styleUrls: ['./sidebar-item.ui-component.scss'],
})
export class SidebarItemUiComponent {
  @HostBinding('class.group') group = true;
}
