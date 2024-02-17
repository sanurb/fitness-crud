import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[simplified-sidebar-items]',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-items.ui-component.html',
  styleUrls: ['./sidebar-items.ui-component.scss'],
})
export class SidebarItemsUiComponent {}
