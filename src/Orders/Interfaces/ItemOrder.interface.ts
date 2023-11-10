
//interface criada para servir de forma genérica 
export interface ItemOrderInterface{
    id: number;
    name: string;//um nome para o: (produto, serviço ou locação)
    price: number;//valor do item que será anexado ao pedido(produto, serviço ou locação)
    idOrder: number;//ID do pedido que este item irá fazer parte 
}