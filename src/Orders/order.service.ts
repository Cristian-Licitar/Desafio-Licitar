import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dtos/order.dto';


@Injectable()
export class OrderService{

    orders: OrderDto[] = [{id: 1, name: 'Pedido de reforma', price: 300}];

    getOrders(): OrderDto[]{
        return this.orders;
    }

    getOrderById(id: number): OrderDto {
        return this.orders.find(order => order.id === id);
    }

    createOrder(order: OrderDto): OrderDto{
        this.orders.push(order);
        return order;
    }

    updateOrder(orderUpdate: OrderDto): OrderDto {
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