import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopData } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';
import { ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-web-page-edit',
  templateUrl: './web-page-edit.page.html',
  styleUrls: ['./web-page-edit.page.scss'],
})
export class WebPageEditPage implements OnInit {

  shopData!: ShopData;
  shopId!: number;

  sections: Section[] = [];

  constructor(private route: ActivatedRoute, private shopService: ShopService) {
  }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop(); // Llama al método para obtener los datos de la tienda
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }
  }

  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        this.shopData = shopData;
        if (!this.shopData) {
          console.error('No se encontró la tienda con el ID proporcionado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos de la tienda:', error);
      }
    });
  }


  addSection(sectionType: string) {
    let newSection: Section;

    if (sectionType === 'banner') {
      const sectionData: HeroSectionData = {
        banner_1:
        {
          "subtitle": "Big Sale Offer3",
          "title": "Get The Best Deal on CCTV Camera",
          "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, perspiciatis sapiente exercitationem delectus quisquam incidunt voluptatibus ex accusamus, molestiae neque aspernatur. Ut laborum praesentium et unde, magni rem aut dolore!",
          "price_text": "Combo Only:",
          "price": "590$",
          "button": "Shop Now",
          "images": "../../assets/img/banner3.png"
          //id de product?? o enlace
        },
        "banner_2": {
          "subtitle": "New line required",
          "title": "iphone 13 pro max",
          "price": "590$",
          "images": "../../assets/img/banner3.png"
          //enlace
        },
        "banner_3": {
          "title": "Weekly Sale!",
          "content": "Saving up to 50% off all online store items this week.",
          "button": "Shop Now",
          "images": "../../assets/img/banner3.png"
          //enlace
        }
      }
      newSection = { type: sectionType, data: sectionData };
    } else if (sectionType === 'product') {
      newSection = { type: sectionType, data: {} };
    } else {
      newSection = { type: "", data: {} };
    }
    this.sections.push(newSection);
    this.updateShopData();
  }

  editSection(event: any) {
    const index = event.index;
    const newData = event.newData;
  }


  deleteSection(index: number) {
    this.sections.splice(index, 1);
  }

  updateShopData() {

  }
}
