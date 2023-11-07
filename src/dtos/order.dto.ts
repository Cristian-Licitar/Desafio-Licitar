import { IsNotEmpty } from "class-validator";

export class OrderDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    valueFinal: number;
    service?: Service;
    product?: Product;
    location?: Location;
}

export class Service {
    id: number;
    name: string;
    price: number;
    idOrder: number;
}

export class Product {
    id: number;
    name: string;
    price: number;
    idOrder: number;
}

export class Location {
    id: number;
    name: string;
    price: number;
    idOrder: number;
}

