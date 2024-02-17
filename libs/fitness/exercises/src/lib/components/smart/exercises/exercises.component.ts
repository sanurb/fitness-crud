import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ExercisesState } from '@fitness-crud/data-access-exercises';
import { CrudListState } from '@fitness-crud/shared/data-access-crud-state';
import {
  BadgeUiComponent,
  BaseLayoutCrudListComponent,
  BaseLayoutListViewUiComponent,
  ButtonUiComponent,
  DeleteModalUiComponent,
  InputUiComponent,
  tableComponents,
} from '@fitness-crud/shared/ui-design-system';

@Component({
  selector: 'fitness-crud-exercises',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseLayoutListViewUiComponent,
    ButtonUiComponent,
    RouterLink,
    RouterOutlet,
    tableComponents,
    BadgeUiComponent,
    BaseLayoutCrudListComponent,
    DeleteModalUiComponent,
    InputUiComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
})
export class ExercisesComponent {
  private readonly exercisesState = inject(ExercisesState);
  protected readonly listState = new CrudListState(this.exercisesState);

  private readonly fromCrudState = this.listState.selectMany([
    'itemsToDelete',
    'someSelected',
    'numberOfSelectedItems',
    'allSelected',
    'items',
    'loading',
    'selectedItems',
    'query',
  ]);

  private readonly viewModel = computed(() => {
    const {
      items,
      someSelected,
      selectedItems,
      allSelected,
      itemsToDelete,
      loading,
      numberOfSelectedItems,
      query,
    } = this.fromCrudState();
    return {
      numberOfSelectedItems,
      selectedItems,
      loading,
      someSelected,
      allSelected,
      items: items.filter(
        (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      ),
      deleteModalOpen: itemsToDelete.length > 0,
    };
  });

  protected tracker = (i: number) => i;

  protected get vm() {
    return this.viewModel();
  }
}
