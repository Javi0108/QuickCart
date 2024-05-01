import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent implements OnInit {
  @Input() shopId!: number;
  @Input() items: Item[] = [];
  @Input() selectedItem: string | null = null;
  @Input() title = 'Select Items';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string | null>();

  filteredItems: Item[] = [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) { }


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
    this.modalController.dismiss(null, 'cancel');
  }

  confirmChanges() {
    this.modalController.dismiss(this.selectedItem, 'confirm');
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
    if (this.selectedItem === value) {
      this.selectedItem = null;
    } else {
      this.selectedItem = value;
    }
  }

  async addProduct() {

    let createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: [''],
      shortDescription: [''],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
    });

    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      cssClass: 'add-product-modal',
      componentProps: { createProductForm: createProductForm, shopId: this.shopId }
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const newProduct = {
          text: data.data.name,
          value: data.data.id_product.toString(),
          img: "http://localhost:8000" + data.data.avatar
        };
  
        this.items.push(newProduct);
        this.filteredItems.push(newProduct);
  
        this.selectionChange.emit(this.selectedItem);
      }
    });

    return await modal.present();
  }
}

export interface Item {
  text: string;
  value: string;
  img: string;
  selected?: boolean; // Opcional, para manejar el estado seleccionado directamente en los ítems
}
