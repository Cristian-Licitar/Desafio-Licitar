import { Controller, Get, Post, Body} from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "src/dtos/order.dto";

@Controller('/orders')
export class OrderController{

    constructor(private readonly orderService: OrderService){
    }

    @Get()
    findAll(): OrderDto[] {
        return this.orderService.getOrders();
    }

    @Get('/:id')
    findById(id: number): OrderDto{
        return this.orderService.getOrderById(id);
    }

    @Post()
    create(@Body() order: OrderDto): OrderDto{
        return this.orderService.createOrder(order);
    }
}