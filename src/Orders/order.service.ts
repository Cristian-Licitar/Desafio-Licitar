import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dtos/order.dto';
import { OrderInterface } from './Interfaces/Order.interface';
import { ItemOrderInterface } from './Interfaces/ItemOrder.interface';

@Injectable()
export class OrderService{

    orders: OrderInterface[] = [
        {   
            id: 1, name: 'compra de cadeira', totalValue: 110, 
            itemsOrder: [{id: 1, name: 'cadeira', price: 100, priceTax: 110, type: 'produto', idOrder: 1}],
        }
    ];

    //método que retorna a lista de pedidos
    getOrders(): OrderInterface[]{
        return this.orders;
    }

    //método que retorna o pedido pelo ID passado como parâmetro
    getOrderById(id: number): OrderInterface{
        const order = this.orders.find(order => order.id === id);
        return order;
    }

    //método que cria um novo pedido
    createOrder(order: OrderDto): OrderInterface{
        this.orders.push(order);
        this.calculateNewOrderValue(order);
        return order;
    }

    //método que adiciona um item a um pedido, através do ID do pedido que é passado como parâmetro (idOrder)
    createItemOrder(itemOrder: ItemOrderInterface, idOrder: number): OrderInterface{

        //variável criada para receber o retorno de um boolean através do método applyTax
        const verificationType = this.applyTax(itemOrder);
        if(verificationType){
            this.orders.map((order) => {
                if(order.id === idOrder){
                    order.itemsOrder.push(itemOrder);//adiciono o novo item, a lista de itens do pedido
                    this.calculateFinalValue(idOrder);//chamo o método que atualiza o valor final daquele pedido
                    return order;
                }
            });

        }else {
            return null;
        }
    
    }

    //método que atualiza o pedido
    updateOrder(orderUpdate: OrderDto): OrderInterface {
        const index = this.orders.findIndex(order => order.id === orderUpdate.id);
        if(index !== -1){
            this.orders[index] = orderUpdate;
            this.calculateNewOrderValue(orderUpdate);
            return this.orders[index];
        }else {
            return null;
        }
    }

    //método que exclui um pedido pelo ID
    deleteOrder(id: number): string {
        this.orders = this.orders.filter(order => order.id !== id);
        return 'Serviço deletado com sucesso';
    }

    //método usado para atualizar os valores de um novo pedido
    calculateNewOrderValue(order: OrderInterface){
        if(order.itemsOrder.length > 0){
            //percorro o array de itens do pedido, atualizando os valores dos impostos sobre cada um dos itens
            order.itemsOrder.map(item => {
                this.applyTax(item);
            });
            this.calculateFinalValue(order.id);//atualizo o valor final daquele pedido
        } 
    }

    //método criado para verificar o tipo do item e aplicar o valor do imposto ao novo item adicionado ao pedido
    applyTax(itemOrder: ItemOrderInterface): boolean{

        if(itemOrder.type === 'produto'){
           itemOrder.priceTax = itemOrder.price * 1.1;//adicionando 10% de imposto sobre o produto
        }else if(itemOrder.type === 'serviço'){
            itemOrder.priceTax = itemOrder.price * 1.075;//adicionando 7,5% de imposto sobre o serviço
        }else if(itemOrder.type === 'locação'){
            itemOrder.priceTax = itemOrder.price * 1.05;//adicionando 5% de imposto sobre o serviço
        }else {
            return false;//se o tipo não for igual a nenhum dos 3 que são aceitos, retorno false
        }

        itemOrder.priceTax = Number(itemOrder.priceTax.toFixed(2));//transaformando o resultando da multiplicação para um valor com 2 casas decimais
        return true;//retorno true se a variável "type" for um tipo válido
    }

    //método criado apenas para atualizar o valor final de um pedido, toda vez que um novo item for inserido neste pedido
    calculateFinalValue(id: number): void{
        this.orders.map((order) => {
            if(order.id === id){
                order.itemsOrder.map((item) => {
                    order.totalValue = 0;
                    order.totalValue+= item.priceTax;
                })
            }
        });
    }
}