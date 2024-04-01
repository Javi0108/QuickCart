import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-add-website-modal',
  templateUrl: './add-website-modal.component.html',
  styleUrls: ['./add-website-modal.component.scss'],
})
export class AddWebsiteModalComponent{

  @Input() createWebSiteForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private sellerService: SellerService,
    ) { }

  closeModal() {
    this.modalController.dismiss();
  }

  submitForm() {
    if (this.createWebSiteForm.valid) {

      console.log(this.createWebSiteForm.value)
      this.sellerService.addShop(this.createWebSiteForm.value).subscribe({
        next: (response) => {
          console.log('Tienda creada:', response);
          this.modalController.dismiss();
        },
        error: (error: any) => {
          console.error('Error al crear la tienda:', error);
        }
      });
    }
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    this.createWebSiteForm.patchValue({
      image: file
    });
  }

  ngOnInit() {
  }
}
