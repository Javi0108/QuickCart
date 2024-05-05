export interface ShopData {
    id_shop: number;
    name: string;
    title: string;
    description: string;
    address: string;
    profile: number;
    logo: string;
    products: ProductData[];
}

export interface ProductData {
    id_product: number;
    name: string;
    price: number;
    description: string;
    stock_quantity: number;
}

export interface Shop{
    name: string;
    logoUrl: string;
}


export interface ShopCreate {
    name: string;
    title: string;
    description: string;
    address: string;
    logo: string;
}


export interface ShopEdit {
    id_shop: number;
    name: string;
    title: string;
    description: string;
    address: string;
    logo: string;
}