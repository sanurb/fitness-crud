import { SignalState } from 'ngx-signal-state';
import {
  convertListToBooleanObject,
  selectedObjToFilteredArray,
} from '@fitness-crud/shared/util-array';
import { computed } from '@angular/core';
import { EntityState } from '@fitness-crud/shared/data-access-crud';

/**
 * This contains boilerplate to avoid redundancy in the list pages
 * All recurring logic of the list page is contained in here
 *
 * This is only valid for pieces of state that are not paged, in our application, that's most of the state
 * We want to load all the data because in our application that makes sense
 */
export class CrudListState<T extends { id: string }> extends SignalState<{
  items: T[];
  loading: boolean;
  selectedItems: { [key: string]: boolean };
  itemsToDelete: string[];
  numberOfSelectedItems: number;
  allSelected: boolean;
  someSelected: boolean;
  query: string;
}> {
  constructor(private readonly entityState: EntityState<T>) {
    super();
    this.initialize({
      loading: false,
      items: [],
      selectedItems: {},
      itemsToDelete: [],
      allSelected: false,
      someSelected: false,
      numberOfSelectedItems: 0,
      query: '',
    });
    const selectedItemsList = this.select('selectedItems', (selectedItems) =>
      selectedObjToFilteredArray(selectedItems)
    );
    const items = this.select('items');
    const numberOfSelectedItems = computed(() => selectedItemsList().length);
    const allSelected = computed(
      () => items().length > 0 && selectedItemsList().length === items().length
    );
    const someSelected = computed(
      () =>
        selectedItemsList().length > 0 &&
        selectedItemsList().length !== items().length
    );

    this.connect({
      ...this.entityState.pick(['items', 'loading']),
      numberOfSelectedItems,
      allSelected,
      someSelected,
    });
  }

  public onDeleteSelected(): void {
    this.patch({
      itemsToDelete: selectedObjToFilteredArray(this.snapshot.selectedItems),
    });
  }

  public selectItem(v: boolean, id: string): void {
    const selectedItems = this.snapshot.selectedItems;
    this.patch({
      selectedItems: { ...selectedItems, [id]: v },
    });
  }

  public allSelectedChange(event: boolean): void {
    if (event) {
      this.patch({
        selectedItems: convertListToBooleanObject(this.snapshot.items),
      });
    } else {
      this.patch({ selectedItems: {} });
    }
  }

  public deleteItem(id: string): void {
    console.log('snapshot', this.snapshot.items)
    this.patch({
      itemsToDelete: [id],
    });
  }

  public closeDialog(): void {
    console.log('closeDialog');
    this.patch({
      itemsToDelete: [],
    });
  }

  public performRemove(): void {
    console.log('performRemove');
    console.log('itemsToDelete', this.snapshot.itemsToDelete);
    this.entityState.deleteRange(this.snapshot.itemsToDelete);
    this.patch({
      itemsToDelete: [],
    });
  }
}
