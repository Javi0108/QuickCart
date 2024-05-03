import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-section-modal',
  templateUrl: './edit-section-modal.component.html',
  styleUrls: ['./edit-section-modal.component.scss'],
})
export class EditSectionModalComponent {
  imageUrl: string = "https://images.unsplash.com/photo-1682686578615-39549501dd08?auto=format&fit=clip&w=400&h=200&q=100";
  overlayOpacity: number = 50;
  fixedBackground: boolean = false; 
  hexColor: string = "#eeeeee";
  file: File | null = null;

  constructor(private modalController: ModalController) {}

  closeModal() {
    const modalData = {
      imageUrl: this.imageUrl,
      overlayOpacity: this.overlayOpacity,
      fixedBackground: this.fixedBackground,
      hexColor: this.hexColor,
    };

    this.modalController.dismiss(modalData, 'confirm');
  }

  changeImage(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.convertFileToDataURL(this.file);
    }
  }

  convertFileToDataURL(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  selectImage() {
    const inputElement: HTMLInputElement | null = document.querySelector('.zyro-image-selector__input');
    if (inputElement) {
      inputElement.click();
    }
  }
}
