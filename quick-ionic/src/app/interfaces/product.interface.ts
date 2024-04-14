export interface Product {
    id_product: number;
    shop: Shop;
    name: string;
    brand: string | null;
    short_description: string | null;
    description: string;
    price: number;
    avatar: string; 
    stock_quantity: number;
    images: ProductImage[];
    tags: Tag[]; 
}

export interface Shop {
    id_shop: number;
    name: string;
    title: string;
    description: string | null;
    address: string | null;
    logo: string | null;
    data: Record<string, any>;
  }
  
  export interface ProductImage {
    id: number;
    image: string; 
    product: Product; 
  }
  
  export interface Tag {
    id: number;
    name: string;
  }


export interface ProductCreate {

}