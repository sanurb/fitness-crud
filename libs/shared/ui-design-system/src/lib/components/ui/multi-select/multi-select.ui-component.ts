import { Component, computed, forwardRef, inject, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignalState } from 'ngx-signal-state';
import { InputUiComponent } from '../form/input/input.ui-component';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'simplified-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule,
    InputUiComponent,
    FormsModule],
  templateUrl: './multi-select.ui-component.html',
  styleUrls: ['./multi-select.ui-component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectUiComponent),
      multi: true
    }
  ]
})
export class MultiSelectUiComponent<T> extends SignalState<{
  query: string,
  isOpen: boolean,
  items: T[],
  filteredItems: T[],
  itemKey: keyof T | undefined
  itemLabel: keyof T | undefined
}> implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private overlayRef: OverlayRef | undefined;
  private readonly viewModel = this.selectMany(['query', 'isOpen', 'filteredItems', 'itemKey', 'itemLabel']);

  constructor() {
    super();
    this.initialize({
      query: '',
      items: [],
      isOpen: true,
      filteredItems: [],
      itemKey: undefined,
      itemLabel: undefined
    });
    const items = this.select('items');
    const query = this.select('query');
    this.connect({
      filteredItems: computed(() => items().filter(item => this.comparePredicate(item, query())))
    });
  }

  @Input()
  public set itemKey(itemKey: keyof T) {
    this.patch({ itemKey });
  };

  @Input()
  public set itemLabel(itemLabel: keyof T) {
    this.patch({ itemLabel });
  };

  @Input()
  public set items(items: T[]) {
    this.patch({ items });
  };

  protected get vm() {
    return this.viewModel();
  }

  @Input() public comparePredicate: ((v: T, query: string) => boolean) = () => true;

  public ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.patch({ isOpen: false });
    }
  }

  protected tracker = (i: number) => i;
}
