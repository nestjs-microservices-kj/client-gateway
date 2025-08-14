import { OrderStatus } from '../enum/order.enum';

export interface Order {
  id?: string;
  totalAmount: number;
  totalItems: number;

  status: OrderStatus;
  paid: boolean;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
