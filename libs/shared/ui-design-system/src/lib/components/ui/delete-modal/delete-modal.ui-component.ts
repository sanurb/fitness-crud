import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUiComponent } from '../modal/modal.ui-component';
import { ButtonUiComponent } from '../button/button.ui-component';

@Component({
  selector: 'simplified-delete-modal',
  standalone: true,
  imports: [CommonModule, ModalUiComponent, ButtonUiComponent],
  templateUrl: './delete-modal.ui-component.html',
  styleUrls: ['./delete-modal.ui-component.scss'],
})
export class DeleteModalUiComponent {
  @Output() public readonly approve = new EventEmitter();
  @Output() public readonly decline = new EventEmitter();
  @Input() public label?: string;
}
