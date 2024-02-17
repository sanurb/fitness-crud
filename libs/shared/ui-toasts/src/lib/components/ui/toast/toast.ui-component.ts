import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'simplified-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.ui-component.html',
  styleUrls: ['./toast.ui-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastUiComponent {
  @Input() public toastType: 'danger' | 'warning' | 'success' = 'success';
  @Output() public readonly closeToast = new EventEmitter();
}
