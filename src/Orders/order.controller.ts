import { ItemOrderInterface } from 'src/Orders/Interfaces/ItemOrder.interface';
import { Controller, Get, Post, Body, Param, Patch, Delete} from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "src/dtos/order.dto";
import { OrderInterface } from "./Interfaces/Order.interface";

@Controller('/orders')
export class OrderController{

    constructor(private readonly orderService: OrderService){
    }

    @Get()
    findAll(): OrderInterface[] {
        return this.orderService.getOrders();
    }

    @Get('/:id')
    findById(@Param('id') id: string): OrderInterface | string{
        const idOrder = parseInt(id);//transformando a string em um número inteiro
        return this.orderService.getOrderById(idOrder);
    }

    @Post()
    createOrder(@Body() order: OrderDto): OrderInterface | string{
        return this.orderService.createOrder(order);
    }

    @Post('/:id/items')
    createItemOrder(@Body() itemOder: ItemOrderInterface, @Param('id') idOrder: string): OrderInterface | string{
        const id = parseInt(idOrder);
        return this.orderService.createItemOrder(itemOder, id);
    }

    @Patch('/update')
    update(@Body() order: OrderDto): OrderInterface | string{
        return this.orderService.updateOrder(order);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): string {
        const idOrder = parseInt(id);
        return this.orderService.deleteOrder(idOrder);
    }
}