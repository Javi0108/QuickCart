import { Product } from '../interfaces/product.interface';

export interface Order {
    id_order: number;
    id_stripe: string;
    profile: number; 
    order_date: string; 
    status: string;
    order_products: OrderProduct[];
}

export interface OrderProduct {
    id: number;
    order: number;
    product: Product;
    quantity: number;
}