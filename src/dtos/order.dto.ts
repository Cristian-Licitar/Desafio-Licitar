import { IsNotEmpty } from "class-validator";
import { ItemOrderInterface } from "src/Orders/Interfaces/ItemOrder.interface";

export class OrderDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string;
    totalValue?: number;
    itemsOrder?: ItemOrderInterface[];//Tipo de array que pode armazenar uma lista de: Produtos, Serviços ou Locações
}