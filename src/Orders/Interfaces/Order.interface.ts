import { ItemOrderInterface } from "./ItemOrder.interface";

export interface OrderInterface{
    id: number;
    name: string;//nome do pedido
    totalValue?: number;//Variável que armazena o valor total, somadando os impostos para cada tipo de pedido
    itemsOrder?: ItemOrderInterface[];//Tipo de array que pode armazenar uma lista de: Produtos, Serviços ou Locações
}