import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-website-modal',
  templateUrl: './add-website-modal.component.html',
  styleUrls: ['./add-website-modal.component.scss'],
})
export class AddWebsiteModalComponent{

  @Input() createWebSiteForm!: FormGroup;

  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }

  submitForm() {
    console.log(this.createWebSiteForm.value);
    this.modalController.dismiss();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Aquí puedes manejar el archivo seleccionado según tus necesidades
    console.log(file);
  }

  ngOnInit() {
  }
}
