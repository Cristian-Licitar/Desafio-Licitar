import { IsNotEmpty } from "class-validator";
import { ItemOrderInterface } from "src/Orders/Interfaces/ItemOrder.interface";

export class OrderDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string;//nome do pedido
    totalValue?: number;//Variável que armazena o valor total do pedido
    itemsOrder?: ItemOrderInterface[];//Tipo de array que pode armazenar uma lista de: Produtos, Serviços ou Locações
}