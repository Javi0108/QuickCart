import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-section-modal',
  templateUrl: './edit-section-modal.component.html',
  styleUrls: ['./edit-section-modal.component.scss'],
})
export class EditSectionModalComponent {
  @Input() image!: string | null;
  @Input() overlayOpacity!: number;
  @Input() fixedBackground!: boolean; 
  @Input() hexColor!: string ;
  file: File | null = null;

  constructor(private modalController: ModalController) {}

  closeModal() {
    const modalData = {
      image: this.image,
      overlay_opacity: this.overlayOpacity,
      fixed_background: this.fixedBackground,
      hex_color: this.hexColor,
    };

    this.modalController.dismiss(modalData, 'confirm');
  }

  changeImage(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.convertFileToDataURL(this.file);
    }
  }

  clearImage() {
    this.image = null;
    this.file = null;
  }

  convertFileToDataURL(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
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
