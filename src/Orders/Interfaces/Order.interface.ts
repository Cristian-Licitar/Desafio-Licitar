import { LocationInterface } from "./Location.interface";
import { ProductInterface } from "./Product.interface";
import { ServiceInterface } from "./Service.interface";


export interface OrderInterface{
    id: number;
    name: string;
    valueFinal: number;
    service?: ServiceInterface;
    product?: ProductInterface;
    location?: LocationInterface;
}