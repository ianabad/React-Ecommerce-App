export interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Cart {
    id: number;
    buyerId: string;
    items: CartItem[];
}

