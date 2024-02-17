import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonUiComponent } from '../button/button.ui-component';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom';

@Component({
  selector: 'simplified-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonUiComponent],
  templateUrl: './dropdown.ui-component.html',
  styleUrls: ['./dropdown.ui-component.scss'],
})
export class DropdownUiComponent implements AfterViewInit {
  protected readonly open = signal(false);
  @Input() public buttonType:
    | 'none'
    | 'default'
    | 'alternative'
    | 'dark'
    | 'light'
    | 'green'
    | 'red'
    | 'yellow'
    | 'purple' = 'default';
  @Input() public mobileBlock = false;
  @Input() public disabled = false;

  @Input() public position: Placement = 'bottom-start';
  @ViewChild('dropdown') public dropdown!: ElementRef;
  @ViewChild('button', { read: ElementRef }) public button!: ElementRef;

  @HostBinding('class') get class() {
    let extraClasses = 'inline-flex items-center';
    if (this.mobileBlock) {
      extraClasses += ' w-full md:w-auto lg:w-auto';
    }
    return extraClasses;
  }

  protected x = 0;
  protected y = 0;
  protected width = 0;

  protected toggle(): void {
    this.open.update((v) => !v);
    this.calculatePosition();
  }

  private calculatePosition() {
    computePosition(this.button.nativeElement, this.dropdown.nativeElement, {
      placement: this.position,
      middleware: [offset(8), flip(), shift()],
    }).then(({ x, y }: { x: number; y: number }) => {
      this.dropdown.nativeElement.style.left = x + 'px';
      this.dropdown.nativeElement.style.top = y + 'px';
      this.width = this.button.nativeElement.offsetWidth;
    });
  }

  public ngAfterViewInit(): void {
    autoUpdate(this.button.nativeElement, this.dropdown.nativeElement, () => {
      if (!this.open()) return;
      this.calculatePosition();
    });
  }

  // Onclick outside the dropdown, close it
  @HostListener('document:click', ['$event'])
  public clickout(event: Event): void {
    if (
      !this.dropdown.nativeElement.contains(event.target) &&
      this.open() &&
      !this.button.nativeElement.contains(event.target)
    ) {
      this.open.set(false);
    }
  }
}
