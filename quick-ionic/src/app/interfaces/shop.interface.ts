export interface ShopData {
    shop_name: string;
    title: string;
    description: string;
    address: string;
    logo: string;
    products: ProductData[];
}

export interface ProductData {
    id_product: number;
    product_name: string;
    price: number;
    description: string;
    stock_quantity: number;
}

export interface Shop{
    name: string;
    logoUrl: string;
}