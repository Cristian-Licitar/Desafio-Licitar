import { ItemOrderInterface } from "./ItemOrder.interface";


export interface OrderInterface{
    id: number;
    name: string;//nome do pedido
    valueFinal: number;//Variável que armazena o valor final somado ao imposto do tipo de pedido
    type: string;//armazena o tipo do pedido, se é para: (PRODUTO, SERVIÇO OU LOCAÇÕES)
    itemOrder?: ItemOrderInterface;//armazena o objeto com os dados do item inserido no pedido
}