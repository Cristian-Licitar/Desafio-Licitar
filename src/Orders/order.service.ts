import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dtos/order.dto';
import { OrderInterface } from './Interfaces/Order.interface';
import { ItemOrderInterface } from './Interfaces/ItemOrder.interface';

@Injectable()
export class OrderService{

    orders: OrderInterface[] = [
        {id: 1, name: 'compra de cadeira', totalValue: 110, 
        itemsOrder: [{id: 1, name: 'cadeira', price: 100, type: 'produto', idOrder: 1}],
        }
    ];

    //método que retorna a lista de pedidos
    getOrders(): OrderInterface[]{
        return this.orders;
    }

    //método que retorna o pedido pelo ID passado como parâmetro
    getOrderById(id: number): OrderInterface{
        return this.orders.find(order => order.id === id);
    }

    //método que cria um novo pedido
    createOrder(order: OrderDto): OrderInterface{
        this.orders.push(order);
        return order;
    }

    //método que adiciona um item a um pedido, através do ID do pedido que é passado como parâmetro (idOrder)
    createItemOrder(itemOrder: ItemOrderInterface, idOrder: number): string{

        //variável criada para receber o retorno de um boolean através do método applyTax
        const verificationType = this.applyTax(itemOrder);
        if(verificationType){
            this.orders.map((order) => {
                if(order.id === idOrder){
                    order.itemsOrder.push(itemOrder);//adiciono o novo item, a lista de itens do pedido
                    this.calculateFinalValue(idOrder);//chamo o método que atualiza o valor final daquele pedido
                }
            });
            return `O ${itemOrder.type} foi adicionado ao pedido com sucesso.`;

        }else {
            return `Esse tipo de pedido: ${itemOrder.type} não é reconhecido pela nossa plataforma`;
        }
    
    }

    //método que atualiza o pedido
    updateOrder(orderUpdate: OrderDto): OrderInterface {
        const orderIndex = this.orders.findIndex(order => order.id === orderUpdate.id);
        if(orderIndex !== -1){
            this.orders[orderIndex] = orderUpdate;
            return orderUpdate;
        }else {
            return null;
        }
    }

    //método que exclui um pedido pelo ID
    deleteOrder(id: number): string {
        this.orders.filter(order => order.id !== id);
        return 'Serviço deletado com sucesso';
    }

    //método criado para aplicar o valor do imposto ao novo item adicionado ao pedido
    applyTax(itemOrder: ItemOrderInterface): boolean{

        if(itemOrder.type === 'produto'){
            itemOrder.price*= 1.1;//adicionando 10% de imposto sobre o produto
        }else if(itemOrder.type === 'serviço'){
            itemOrder.price*= 1.075;//adicionando 7,5% de imposto sobre o serviço
        }else if(itemOrder.type === 'locação'){
            itemOrder.price*= 1.05;//adicionando 5% de imposto sobre o serviço
        }else {
            return false;//se o tipo não for igual a nenhum dos 3 que são aceitos, retorno false
        }

        return true;//retorno true se a variável "type" for um tipo válido
    }

    //método criado apenas para atualizar o valor final de um pedido, toda vez que um novo item for inserido neste pedido
    calculateFinalValue(id: number): void{
        this.orders.map((order) => {
            if(order.id === id){
                order.itemsOrder.map((item) => {
                    order.totalValue+= item.price; 
                })
            }
        });
    }
}