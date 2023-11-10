import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dtos/order.dto';
import { OrderInterface } from './Interfaces/Order.interface';

@Injectable()
export class OrderService{

    orders: OrderInterface[] = [{id: 1, name: 'Pedido de reforma', valueFinal: 300, type: 'Serviço'}];

    getOrders(): OrderInterface[]{
        return this.orders;
    }

    getOrderById(id: number): OrderInterface {
        return this.orders.find(order => order.id === id);
    }

    createOrder(order: OrderDto): OrderInterface{
        this.orders.push(order);
        return order;
    }

    updateOrder(orderUpdate: OrderDto): OrderInterface {
        const orderIndex = this.orders.findIndex(order => order.id === orderUpdate.id);
        if(orderIndex !== -1){
            this.orders[orderIndex] = orderUpdate;
            return orderUpdate;
        }else {
            return null;
        }
    }

    deleteOrder(id: number): string {
        this.orders.filter(order => order.id !== id);
        return 'Serviço deletado com sucesso';
    }
}