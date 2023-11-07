
export class OrderDto {
    id: number;
    name: string;
    price: number;
    service?: Service;
    product?: Product;
    location?: Location;
}

export class Service {
    id: number;
    name: string;
    price: number;
    type: string;
    idOrder: number;
}

export class Product {
    id: number;
    name: string;
    price: number;
    type: string;
    idOrder: number;
}

export class Location {
    id: number;
    name: string;
    price: number;
    type: string;
    idOrder: number;
}

