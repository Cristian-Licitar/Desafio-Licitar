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
    create(@Body() order: OrderDto): OrderInterface{
        return this.orderService.createOrder(order);
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