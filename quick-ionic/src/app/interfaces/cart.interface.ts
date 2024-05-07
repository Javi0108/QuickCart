import { Product } from '../interfaces/product.interface';


export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id_order: number;
    id_stripe: string;
    profile: number; 
    order_date: string; 
    status: string;
    products: OrderProduct[];
}

export interface OrderProduct {
    id: number;
    order: number;
    product: number;
    quantity: number;
}