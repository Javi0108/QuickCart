import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() selectedItem: string | null = null;
  @Input() title = 'Select Items';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string | null>();

  filteredItems: Item[] = [];

  ngOnInit() {
    this.filteredItems = [...this.items];
    if (this.selectedItem) {
      this.filteredItems.forEach(item => {
        if (item.value === this.selectedItem) {
          item.selected = true;
        }
      });
    }
  }

  trackItems(index: number, item: Item) {
    return item.value;
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.selectedItem);
  }

  searchbarInput(ev: any) {
    this.filterList(ev.target.value);
  }

  filterList(searchQuery: string | undefined) {
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter(item => item.text.toLowerCase().includes(normalizedQuery));
    }
  }

  checkboxChange(ev: any) {
    const { value } = ev.detail;
    // Si el valor ya está seleccionado, se deselecciona
    if (this.selectedItem === value) {
      this.selectedItem = null;
    } else {
      this.selectedItem = value;
    }
  }
}

export interface Item {
  text: string;
  value: string;
  img: string;
  selected?: boolean; // Opcional, para manejar el estado seleccionado directamente en los ítems
}
