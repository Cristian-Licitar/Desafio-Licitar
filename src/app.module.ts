import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './Orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
