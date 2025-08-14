import { NatsModule } from './../transports/nats.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [NatsModule],
})
export class ProductsModule {}
