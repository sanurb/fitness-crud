import { Component, ContentChild, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel, NgModelGroup } from '@angular/forms';

@Component({
  selector: '[simplified-control-wrapper]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ControlWrapperComponent {
  @ContentChild(NgModel) public ngModel?: NgModel;
  public readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true,
  });

  @HostBinding('class.control-wrapper--invalid')
  public get invalid() {
    if ((!this.ngModelGroup && this.ngModel?.control?.errors && this.ngModel?.touched)
      || (this.ngModelGroup?.control?.errors && this.ngModelGroup.touched)) {
      return true;
    }
    return false;
  }
}
