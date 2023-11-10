import { IsNotEmpty } from "class-validator";
import { ItemOrderInterface } from "src/Orders/Interfaces/ItemOrder.interface";

export class OrderDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    valueFinal: number;
    @IsNotEmpty()
    type: string;
    itemOrder?: ItemOrderInterface;
}
