import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalState } from 'ngx-signal-state';
import { RouterLink } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { templateDrivenForms } from '@fitness-crud/shared/ui-forms';
import { SidebarUiComponent } from '../sidebar/sidebar.ui-component';
import { NavbarUiComponent } from '../navbar/navbar.ui-component';

@Component({
  selector: 'simplified-base-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    templateDrivenForms,
    SidebarUiComponent,
    NavbarUiComponent,
  ],
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent extends SignalState<{
  sidebarOpen: boolean;
  menuOpen: boolean;
}> {
  @Input() public avatar: SafeResourceUrl = '';
  @Input() public search?: string;
  @Output() public searchChange = new EventEmitter<string>();
  @Input() public username: string = '';
  @Output() public readonly signout = new EventEmitter<void>();

  protected readonly sidebarOpen = signal(false);

  protected toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }
}
