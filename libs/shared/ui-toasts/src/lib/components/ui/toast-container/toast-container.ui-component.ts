import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { ToastUiComponent } from '../toast/toast.ui-component';

@Component({
  selector: 'simplified-toast-container',
  standalone: true,
  imports: [CommonModule, ToastUiComponent],
  templateUrl: './toast-container.ui-component.html',
  styleUrls: ['./toast-container.ui-component.scss'],
})
export class ToastContainerUiComponent {
  protected readonly toastsService = inject(ToastService);

  protected onCloseToast(id: number): void {
    this.toastsService.closeToast(id);
  }
}
