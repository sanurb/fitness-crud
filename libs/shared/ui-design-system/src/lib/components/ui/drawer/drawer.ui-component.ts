import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'simplified-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.ui-component.html',
  styleUrls: ['./drawer.ui-component.scss'],
})
export class DrawerUiComponent {
  @Output() public readonly closeDrawer = new EventEmitter<void>();
}
