import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'simplified-sidebar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.ui-component.html',
  styleUrls: ['./sidebar.ui-component.scss'],
})
export class SidebarUiComponent {
  @Input() public open = false;
}
