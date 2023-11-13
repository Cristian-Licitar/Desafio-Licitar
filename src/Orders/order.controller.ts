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
    findById(@Param('id') id: number): OrderInterface{
        return this.orderService.getOrderById(id);
    }

    @Post()
    createOrder(@Body() order: OrderDto): OrderInterface{
        return this.orderService.createOrder(order);
    }

    @Post('/:id/items')
    createItemOrder(@Body() itemOder: ItemOrderInterface, @Param('id') idOrder: number): string{
        return this.orderService.createItemOrder(itemOder, idOrder);
    }

    @Patch('/update')
    update(@Body() order: OrderDto): OrderInterface{
        return this.orderService.updateOrder(order);
    }

    @Delete('/:id')
    delete(@Param('id') id: number): string {
        return this.orderService.deleteOrder(id);
    }
}