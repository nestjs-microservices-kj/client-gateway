import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

// TODO: before
// import { OrderStatus, OrderStatusList } from './../enum/order.enum';
// import {
//   IsBoolean,
//   IsEnum,
//   IsNumber,
//   IsOptional,
//   IsPositive,
// } from 'class-validator';

// export class CreateOrderDto {
//   @IsNumber()
//   @IsPositive()
//   totalAmount: number;

//   @IsNumber()
//   @IsPositive()
//   totalItems: number;

//   @IsEnum(OrderStatusList, {
//     message: `Possible status values are ${OrderStatusList.join(',')}`,
//   })
//   @IsOptional()
//   status: OrderStatus = OrderStatus.PENDING;

//   @IsBoolean()
//   @IsOptional()
//   paid: boolean = false;
// }
